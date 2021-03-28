import axios from "axios";
import firebase from "firebase/app";
import { loadStripe } from "@stripe/stripe-js";

export function loginUser(userData) {
  return async (dispatch, getState, getFirebase) => {
    dispatch({ type: "LOADING_UI" });
    if (userData.email === "") {
      dispatch({
        type: "SET_ERRORS",
        payload: { email: "Lauks nedrīkst būt tukšs" },
      });
      return;
    }
    if (userData.password === "") {
      dispatch({
        type: "SET_ERRORS",
        payload: { password: "Lauks nedrīkst būt tukšs" },
      });
      return;
    }
    try {
      getFirebase().login(userData);
      dispatch({ type: "CLEAR_ERRORS" });
    } catch (err) {
      console.error(err);
      dispatch({
        type: "SET_ERRORS",
        payload: { general: "Nepareizi dati, lūdzu, mēģiniet vēlreiz" },
      });
    }
  };
}

export function signupUser(newUserData) {
  return (dispatch, getState, getFirebase) => {
    dispatch({ type: "LOADING_UI" });
    axios
      .post("/signup", newUserData)
      .then(() => {
        getFirebase().login({
          email: newUserData.email,
          password: newUserData.password,
        });
        var d = new Date();
        d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        window.document.cookie = `new_account=true; ${expires}`;
        dispatch({ type: "CLEAR_ERRORS" });
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data) {
          dispatch({
            type: "SET_ERRORS",
            payload: err.response.data,
          });
        } else {
          dispatch({
            type: "SET_ERRORS",
            payload: {
              general: "Kaut kas nogāja greizi, lūdzu, mēģiniet vēlreiz",
            },
          });
        }
      });
  };
}

export function signupFB() {
  return (dispatch, getState, getFirebase) => {
    dispatch({ type: "LOADING_UI" });
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("user_gender, user_birthday");
    provider.setCustomParameters({
      display: "popup",
    });
    firebase.auth().useDeviceLanguage();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result.additionalUserInfo.isNewUser) {
          const newUserData = {
            handle: result.additionalUserInfo.profile.first_name,
            email: result.user.email,
            userId: firebase.auth().currentUser.uid,
            dob: result.additionalUserInfo.profile.birthday,
            gender: result.additionalUserInfo.profile.gender,
          };
          axios
            .post("/signupGoogleFB", newUserData)
            .then(() => {
              return result.user.getIdToken();
            })
            .then((token) => {
              dispatch({ type: "CLEAR_ERRORS" });
            })
            .catch((err) => {
              if (err.response.data.age) {
                dispatch({
                  type: "SET_ERRORS",
                  payload: { fbAge: err.response.data.age },
                });
              } else {
                dispatch({
                  type: "SET_ERRORS",
                  payload: {
                    fbAge: "Kaut kas nogāja greizi, lūdzu, mēģiniet vēlreiz",
                  },
                });
              }
              firebase.auth().currentUser.delete();
            });
        } else {
          dispatch({ type: "CLEAR_ERRORS" });
        }
      })
      .catch((err) => {
        if (err.code === "auth/account-exists-with-different-credential") {
          dispatch({
            type: "SET_ERRORS",
            payload: { fbEmail: "E-pasta adrese jau reģistrēta ar citu kontu" },
          });
        } else {
          console.log(err);
          dispatch({
            type: "SET_ERRORS",
            payload: {
              fbAge: "Kaut kas nogāja greizi, lūdzu, mēģiniet vēlreiz",
            },
          });
        }
      });
  };
}

export function logoutUser() {
  return (dispatch, getState, getFirebase) => {
    getFirebase().logout();
  };
}

export const goToCheckout = async (coin) => {
  const stripe = await loadStripe(
    "pk_live_51HOO9ZJzmp1DTRTxJR0bXnwDkJLkR2V7HJ8XJsameTBDBVrfZ55YSMYABGyccqwrCnsTFvoK8tRMXTPAyj1cpTcO00e81DplAl"
  );
  axios
    .post("/create-session", coin)
    .then((res) => {
      stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
    })
    .catch((err) => {
      window.alert(err);
    });
};
export function editUserDetails(userDetails) {
  axios.post("/user", userDetails).catch((err) => console.log(err));
}
//Upload profile picture
export function uploadImage(formData) {
  axios
    .post("/user/image", formData)
    .then((res) => {
      if (
        !res.data.oldImageLink.includes(
          "https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/no-img_512x512.png?alt=media"
        )
      ) {
        axios
          .post("/user/removeImage", { link: res.data.oldImageLink })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}
export function addImage(formData) {
  axios.post("/user/addPhotos", formData).catch((err) => console.log(err));
}

export function removeImage(link) {
  axios
    .post("/user/removeImage", { link: link })
    .catch((err) => console.log(err));
}

export function updateDob(dob) {
  return (dispatch) => {
    axios
      .post("updateAge", { dob: dob })
      .then((res) => {
        dispatch({
          type: "CLEAR_ERRORS",
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERRORS",
          payload: {
            dobFail: err.response.data.error,
          },
        });
      });
  };
}

export function updateEmail(e, o) {
  return (dispatch) => {
    var user = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(user.email, e);
    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        user
          .updateEmail(o)
          .then(() => {
            user.sendEmailVerification();
            dispatch({
              type: "SET_ERRORS",
              payload: {
                emailSuccess: "Apstipriniet jauno e-pasta adresi!",
              },
            });
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            if (
              err.message ===
              "The email address is already in use by another account."
            ) {
              dispatch({
                type: "SET_ERRORS",
                payload: {
                  emailFail: "E-pasts jau tiek izmantots.",
                },
              });
            } else {
              dispatch({
                type: "SET_ERRORS",
                payload: {
                  emailFail: "Kaut kas nogāja greizi.",
                },
              });
            }
          });
      })
      .catch(() => {
        dispatch({
          type: "SET_ERRORS",
          payload: {
            emailPassFail: "Nepareiza parole.",
          },
        });
      });
  };
}

export function updatePass(s, l) {
  return (dispatch) => {
    var user = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(user.email, s);
    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        user
          .updatePassword(l)
          .then(() => {
            dispatch({
              type: "SET_ERRORS",
              payload: {
                passwordOldSuccess: "Parole veiksmīgi nomainīta!",
              },
            });
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          })
          .catch((error) => {
            dispatch({
              type: "SET_ERRORS",
              payload: {
                passwordNewFail:
                  "Jaunajai parolei jābūt vismaz 6 ciparus garai!",
              },
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERRORS",
          payload: {
            passwordNewFail: "Nepareiza pašreizēzējā parole.",
          },
        });
      });
  };
}

export function listenChat() {
  return (dispatch) => {
    let uid = firebase.auth().currentUser.uid;
    let users2 = [];
    var audio = new Audio("/notif_audio.mp3");

    const collection = firebase
      .firestore()
      .collection(`/openChats/${uid}/users2`);

    const observer = collection.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            if (change.doc.data().date - Date.now() > -4000) {
              if (localStorage.sound === "true") {
                audio.play();
              }
            }
            change.doc
              .data()
              .ref.get()
              .then((doc) => {
                users2.push({
                  userId: change.doc.id,
                  msg: change.doc.data().msg,
                  type: change.doc.data().type,
                  read: change.doc.data().read,
                  recipient: uid,
                  handle: doc.data().handle,
                  imageUrl: doc.data().imageUrl,
                  state: doc.data().state,
                });
                const stateObserver = doc.ref.onSnapshot(
                  (snap) => {
                    let index = users2.findIndex((x) => x.userId === snap.id);
                    users2[index].state = snap.data().state;
                    users2[index].handle = snap.data().handle;
                    users2[index].imageUrl = snap.data().imageUrl;
                    dispatch({
                      type: "SET_ALLOPENCHATS",
                      payload: users2,
                    });
                  },
                  () => {
                    stateObserver();
                  }
                );
                dispatch({
                  type: "SET_ALLOPENCHATS",
                  payload: users2,
                });
              });
          }
          if (change.type === "modified") {
            if (change.doc.data().date - Date.now() > -4000) {
              if (localStorage.sound !== "false") {
                audio.play();
              }
            }
            let index = users2.findIndex((x) => x.userId === change.doc.id);
            users2[index] = {
              ...users2[index],
              msg: change.doc.data().msg,
              type: change.doc.data().type,
              read:
                window.location.pathname ===
                `/chat/${
                  uid < change.doc.id
                    ? uid + "_" + change.doc.id
                    : change.doc.id + "_" + uid
                }`
                  ? true
                  : change.doc.data().read,
            };
            dispatch({
              type: "SET_ALLOPENCHATS",
              payload: users2,
            });
          }
          if (change.type === "removed") {
            let index = users2.findIndex((x) => x.userId === change.doc.id);
            users2.splice(index, 1);
            dispatch({
              type: "SET_ALLOPENCHATS",
              payload: users2,
            });
          }
        });
      },
      () => {
        observer();
      }
    );
  };
}

export function listenNotification() {
  return (dispatch) => {
    var uid = firebase.auth().currentUser.uid;
    var audio = new Audio("/notif_audio.mp3");
    let users2 = [];

    const collection = firebase
      .firestore()
      .collection(`/openChats/${uid}/notifications`);

    const observer = collection.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            change.doc
              .data()
              .ref.get()
              .then((doc) => {
                if (change.doc.data().date - Date.now() > -4000) {
                  if (localStorage.sound === "true") {
                    audio.play();
                  }
                }
                users2.push({
                  userId: change.doc.id,
                  msg: change.doc.data().msg,
                  type: change.doc.data().type,
                  read: change.doc.data().read,
                  recipient: uid,
                  handle: doc.data().handle,
                  imageUrl: doc.data().imageUrl,
                  state: doc.data().state,
                });
                dispatch({
                  type: "SET_ALLNOTIFICATIONS",
                  payload: users2,
                });
              });
          }
          if (change.type === "modified") {
            if (change.doc.data().date - Date.now() > -4000) {
              if (localStorage.sound !== "false") {
                audio.play();
              }
            }
            let index = users2.findIndex((x) => x.userId === change.doc.id);
            users2[index] = {
              ...users2[index],
              msg: change.doc.data().msg,
              type: change.doc.data().type,
              read: change.doc.data().read,
            };

            dispatch({
              type: "SET_ALLNOTIFICATIONS",
              payload: users2,
            });
          }
          if (change.type === "removed") {
            let index = users2.findIndex((x) => x.userId === change.doc.id);
            users2.splice(index, 1);
            dispatch({
              type: "SET_ALLNOTIFICATIONS",
              payload: users2,
            });
          }
        });
      },
      () => {
        observer();
      }
    );
  };
}

export function rtdb_and_local_fs_presence() {
  var uid = firebase.auth().currentUser.uid;
  var userStatusDatabaseRef = firebase.database().ref("/status/" + uid);

  var isOfflineForDatabase = {
    state: "offline",
    last_active: firebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
    state: "online",
    last_active: firebase.database.ServerValue.TIMESTAMP,
  };

  var userStatusFirestoreRef = firebase.firestore().doc("/users/" + uid);

  var isOfflineForFirestore = {
    state: "offline",
    last_active: Date.now(),
  };

  var isOnlineForFirestore = {
    state: "online",
    last_active: Date.now(),
  };

  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => {
      if (snapshot.val() === false) {
        userStatusFirestoreRef.update(isOfflineForFirestore);
        return;
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase);

          userStatusFirestoreRef.update(isOnlineForFirestore);
        });
    });
}

export function deleteProfile(s, e, fb) {
  return (dispatch, getState, getFirebase) => {
    if (fb) {
      axios
        .delete("/deleteProfile")
        .then(() => {
          dispatch(logoutUser());
        })
        .catch((err) => {
          dispatch({
            type: "SET_ERRORS",
            payload: {
              passwordDeleteAccFail:
                "Kaut kas nogāja greizi, mēģiniet vēlreiz vai sazinieties ar mums: info@istaiespeja.lv",
            },
          });
        });
    } else {
      const credential = getFirebase().auth.EmailAuthProvider.credential(s, e);
      getFirebase()
        .reauthenticate({ credential: credential })
        .then(() => {
          axios
            .delete("/deleteProfile")
            .then(() => {
              dispatch(logoutUser());
            })
            .catch((err) => {
              dispatch({
                type: "SET_ERRORS",
                payload: {
                  passwordDeleteAccFail:
                    "Kaut kas nogāja greizi, mēģiniet vēlreiz vai sazinieties ar mums: info@mansflirts.lv",
                },
              });
            });
        })
        .catch((err) => {
          dispatch({
            type: "SET_ERRORS",
            payload: {
              passwordDeleteAccFail: "Nepareiza parole.",
            },
          });
        });
    }
  };
}
