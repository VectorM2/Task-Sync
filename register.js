import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,signInWithEmailAndPassword
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

//input fields
const signUp = document.getElementById("signUp");
signUp.addEventListener("click", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;

  if (email === "" || username === "" || password === "" || confirm === "") {
    alert("Please fill in all the fields.");
    return false;
  } else if (password !== confirm) {
    alert("Password and confirmation don't match.");
    return false;
  } else {
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "/index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorAlert = document.getElementById("error");
        errorAlert.innerHTML = errorMessage;
      });
  }
});




