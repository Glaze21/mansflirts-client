import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import store from "../createStore";

export function getAllUsers(amount) {
  return (dispatch, getState, getFirebase) => {
    if (amount === 12) {
      dispatch({ type: "LOADING_USERS" });
    }
    let searchParams = getState().data.searchParams;
    let lookingFor = getState().firebase.profile.lookingFor;

    if (searchParams) {
      searchParams.limit = amount;
      axios
        .post("/filterUsers", { ...searchParams, lookingFor: lookingFor })
        .then((res) => {
          dispatch({
            type: "SET_ALLUSERS",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_ALLUSERS",
            payload: [],
          });
        });
    } else {
      axios
        .post("/getAllUsers", { lookingFor: lookingFor, limit: amount })
        .then((res) => {
          dispatch({
            type: "SET_ALLUSERS",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_ALLUSERS",
            payload: [],
          });
        });
    }
  };
}

export const filterUsers = (limit, params) => (dispatch) => {
  dispatch({
    type: "SET_SEARCH_PARAMS",
    payload: params,
  });
  dispatch(getAllUsers(limit));
};

export const openChat = (uid2) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      const docRef = firebase
        .firestore()
        .doc(`/openChats/${uid}/users2/${uid2}`);
      const notifRef = firebase
        .firestore()
        .doc(`/openChats/${uid}/notifications/${uid2}`);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            return;
          } else {
            docRef.set({
              msg: "",
              ref: firebase.firestore().doc(`users/${uid2}`),
              read: true,
            });
            notifRef.delete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

export const closeChat = (uid, type, uid2, history) => {
  if (history) {
    if (
      history.location.pathname ===
      `/chat/` + (uid < uid2 ? uid + "_" + uid2 : uid2 + "_" + uid)
    ) {
      history.replace("/");
    }
  }
  firebase
    .firestore()
    .doc(`openChats/${uid}/${type}/${uid2}`)
    .delete()
    .catch((err) => console.log(err));
};

export const closeChatA = (id) => {
  firebase
    .firestore()
    .doc(`adminMessages/${id}`)
    .delete()
    .catch((err) => console.log(err));
};

export const blockUser = (uid2) => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const ref = firebase.firestore().doc(`users/${user.uid}`);
      const FieldValue = firebase.firestore.FieldValue;

      ref.get().then((doc) => {
        if (doc.data().blockedUsers.includes(uid2)) {
          ref.set(
            { blockedUsers: FieldValue.arrayRemove(uid2) },
            { merge: true }
          );
        } else {
          ref.set(
            { blockedUsers: FieldValue.arrayUnion(uid2) },
            { merge: true }
          );
        }
      });
    }
  });
};

export function buyCoinsDialog(setOpen) {
  return (dispatch, getState, getFirebase) => {
    if (getState().data.allCoins.length === 0) {
      var data = [];
      firebase
        .firestore()
        .collection("/products/prod_IWW6dAB2lECiy8/prices")
        .orderBy("unit_amount", "asc")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            data.push([doc.id, doc.data()]);
          });
          dispatch({
            type: "SET_PURCHASECOINS",
            payload: data,
          });
        });
    }
    dispatch({
      type: "SET_BUYCOINSDIALOG",
    });
  };
}
