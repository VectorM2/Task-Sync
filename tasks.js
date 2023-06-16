import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyApdCfhPlJOMQ0uZpX8O8PAiUSHpWR595I",
  authDomain: "tasksync-60bc6.firebaseapp.com",
  projectId: "tasksync-60bc6",
  storageBucket: "tasksync-60bc6.appspot.com",
  messagingSenderId: "722766845317",
  appId: "1:722766845317:web:1290b1ebd82489fcc5a0ec",
  databaseURL: "https://tasksync-60bc6-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
// Reference
const tasksRef = ref(database, "tasks");

const addTask = document.getElementById("click");
addTask.addEventListener("click", function() {
  var user = firebase.auth().currentUser;
  const taskInput = document.getElementById("taskInput").value;

  if (user) {
    const newTask = {
      task: taskInput,
      uid: user.uid
    };

    push(tasksRef, newTask)
      .then(() => {
        console.log("Task added successfully!");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  } else {
    console.log("No user is currently signed in.");
  }
});
