import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import firebase from "firebase/app";
import "firebase/auth";
const MySwal = withReactContent(Swal);

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function EmailVerify() {
  var new_account = getCookie("new_account");
  var email_sent = getCookie("email_sent");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (new_account === "" && !user.emailVerified) {
        if (email_sent === "") {
          user.sendEmailVerification().then(() => {
            var d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            window.document.cookie = `email_sent=true; ${expires}`;
          });
        }

        MySwal.fire({
          title: "Apstipriniet e-pastu",
          html: `Mēs jums nosūtījām e-pastu uz ${user.email}, lai verificētu jūsu kontu. Ja 3 minūšu laikā neesat saņēmis e-pastu, nosūtiet e-pastu atkārtoti.`,
          confirmButtonText: "Nosūtīt jaunu e-pastu",
          allowOutsideClick: false,
          width: 600,
          backdrop: `#271c2b66 10`,
          confirmButtonColor: `#ef4183ad`,
          preConfirm: async () => {
            try {
              const res = await user.sendEmailVerification();
              if (res === undefined) {
                MySwal.showValidationMessage(`E-pasts nosūtīts!`);
              }
            } catch (e) {
              MySwal.showValidationMessage(
                `Lūdzu, nedaudz pagaidiet pirms jauna e-pasta sūtīšanas.`
              );
            }
          },
        });
      }
    }
  });

  return <div id="verifyRoot" />;
}

export default EmailVerify;
