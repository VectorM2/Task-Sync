import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, push, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

//fetch current user.
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const displayName = user.displayName;
    const email = user.email;
    const profileEmail = document.getElementById("profileEmail");
    profileEmail.innerHTML = email;
    console.log(uid, email, displayName);
   
    fetchData()


  } else {
    console.log(8);
  }


});

// ...

const addTask = document.getElementById("addTask");
addTask.addEventListener("click", function (event) {
  event.preventDefault();

  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim(); // Remove leading and trailing whitespace

  if (taskValue !== "") {
    const userId = auth.currentUser.uid;
    const userTasksRef = ref(database, 'users/' + userId + '/tasks');
    push(userTasksRef, taskValue)
      .then(function () {
        console.log("Task added successfully!");
        taskInput.value = ""; // Clear the input field
      })
      .catch(function (error) {
        console.error("Error adding task: ", error);
      });
  }
});

// ...



function fetchData() {
  const userId = auth.currentUser.uid;
  const userTasksRef = ref(database, 'users/' + userId + '/tasks');
  onValue(userTasksRef, function (snapshot) {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = ""; // Clear existing tasks

    const taskList = Object.values(snapshot.val() || {}); // Retrieve task list or an empty object

    if (taskList.length === 0) {
      const li = document.createElement("li");
      li.innerText = "No tasks found.";
      tasksContainer.appendChild(li);
    } else {
      taskList.forEach(task => {
        const li = document.createElement("li");
        li.innerText = task;
        tasksContainer.appendChild(li);
      });
    }
  });
}

// ...




//signout
const logOut = document.getElementById("signOut");
logOut.addEventListener("click", function(){
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
})

// Function to delete all tasks in the database
function deleteAllTasks() {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const userTasksRef = ref(database, 'users/' + userId + '/tasks');
    set(userTasksRef, null)
      .then(function () {
        console.log("All tasks deleted successfully!");
      })
      .catch(function (error) {
        console.error("Error deleting tasks: ", error);
      });
  }
}

const erase = document.getElementById("delete");
erase.addEventListener("click",function(){
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const userTasksRef = ref(database, 'users/' + userId + '/tasks');
    set(userTasksRef, null)
      .then(function () {
        console.log("All tasks deleted successfully!");
      })
      .catch(function (error) {
        console.error("Error deleting tasks: ", error);
      });
  }
})