
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyApdCfhPlJOMQ0uZpX8O8PAiUSHpWR595I",
  authDomain: "tasksync-60bc6.firebaseapp.com",
  projectId: "tasksync-60bc6",
  storageBucket: "tasksync-60bc6.appspot.com",
  messagingSenderId: "722766845317",
  appId: "1:722766845317:web:1290b1ebd82489fcc5a0ec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signIn = document.getElementById("signIn");
signIn.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const logError = document.getElementById("logError");

  if (email === "" || password === "") {
    logError.innerHTML = "Please fill in both fields";
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "/dashboard.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logError.innerHTML = errorMessage;
      });
  }
});

const reset = document.getElementById("reset");
reset.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const logError = document.getElementById("logError");

  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      logError.innerHTML = "Password reset email sent!";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      logError.innerHTML = errorMessage;
      // ..
    });
});
