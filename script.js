// ==========================
// Personalized Task Manager
// JavaScript
// ==========================

// Select Elements

const taskForm = document.querySelector("#taskForm");

const taskTitleInput = document.querySelector("#taskTitle");

const taskDetailsInput = document.querySelector("#taskDetails");

const importantTaskInput = document.querySelector("#importantTask");

const taskList = document.querySelector("#taskList");

// Modal Elements

const taskModal = document.querySelector(".task-modal");

const taskOpenBtn = document.querySelector(".todo");

const taskCloseBtn = document.querySelector(".task-modal__close");

// Local Storage Data

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Edit Index

let editTaskIndex = null;

// ==========================
// Render Tasks
// ==========================

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");

    taskCard.className = `task-card ${
      task.completed ? "task-card--completed" : ""
    }`;

    taskCard.innerHTML = `


      <div class="task-card__content">


        <h3>

          ${task.title}

          ${task.isImportant ? "<sup>IMP</sup>" : ""}

        </h3>



        <p>

          ${task.details}

        </p>



      </div>



      <div class="task-card__buttons">


        <button 
          class="task-card__btn complete-btn"
          data-index="${index}"
        >

          ${task.completed ? "Completed" : "Complete"}


        </button>




        <button 
          class="task-card__btn edit-btn"
          data-index="${index}"
        >

          Edit

        </button>





        <button 
          class="task-card__btn delete-btn"
          data-index="${index}"
        >

          Delete

        </button>



      </div>


    `;

    taskList.appendChild(taskCard);
  });
}

renderTasks();

// ==========================
// Add / Update Task
// ==========================

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitleInput.value.trim();

  const details = taskDetailsInput.value.trim();

  const isImportant = importantTaskInput.checked;

  if (title === "" || details === "") {
    alert("Please fill all fields");

    return;
  }

  const taskData = {
    title,

    details,

    isImportant,

    completed: false,
  };

  // Update Existing Task

  if (editTaskIndex !== null) {
    taskData.completed = tasks[editTaskIndex].completed;

    tasks[editTaskIndex] = taskData;

    editTaskIndex = null;
  }

  // Add New Task
  else {
    tasks.push(taskData);
  }

  saveTasks();

  renderTasks();

  taskForm.reset();
});

// ==========================
// Save Tasks
// ==========================

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// Task Buttons
// Event Delegation
// ==========================

taskList.addEventListener("click", (event) => {
  const index = event.target.dataset.index;

  if (event.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
  }

  if (event.target.classList.contains("edit-btn")) {
    const selectedTask = tasks[index];

    taskTitleInput.value = selectedTask.title;

    taskDetailsInput.value = selectedTask.details;

    importantTaskInput.checked = selectedTask.isImportant;

    editTaskIndex = index;
  }

  if (event.target.classList.contains("complete-btn")) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks();
  }
});

// ==========================
// Modal Open
// ==========================

taskOpenBtn.addEventListener("click", () => {
  taskModal.style.display = "block";
});

// ==========================
// Modal Close
// ==========================

taskCloseBtn.addEventListener("click", () => {
  taskModal.style.display = "none";
});

// Close When Click Outside

taskModal.addEventListener("click", (event) => {
  if (event.target === taskModal) {
    taskModal.style.display = "none";
  }
});

/* ==========================
   Daily Goal Manager
   JavaScript
========================== */

// ==========================
// Select Elements
// ==========================

// Modal

const goalOpenBtn = document.querySelector(".goal");

const goalModal = document.querySelector(".goal-modal");

const goalCloseBtn = document.querySelector(".goal-modal__close");

// Form

const goalForm = document.querySelector("#goalForm");

const goalTitleInput = document.querySelector("#goalTitle");

const goalDetailsInput = document.querySelector("#goalDetails");

// Goal List

const goalList = document.querySelector("#goalList");

// ==========================
// Local Storage
// ==========================

let goals = JSON.parse(localStorage.getItem("goals")) || [];

let editGoalIndex = null;

// ==========================
// Open Goal Modal
// ==========================

goalOpenBtn.addEventListener("click", () => {
  goalModal.style.display = "block";
});

// ==========================
// Close Goal Modal
// ==========================

goalCloseBtn.addEventListener("click", () => {
  goalModal.style.display = "none";
});

// Close Outside Click

goalModal.addEventListener("click", (event) => {
  if (event.target === goalModal) {
    goalModal.style.display = "none";
  }
});

// ==========================
// Render Goals
// ==========================

function renderGoals() {
  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const goalCard = document.createElement("div");

    goalCard.className = `goal-card ${
      goal.completed ? "goal-card--completed" : ""
    }`;

    goalCard.innerHTML = `


      <div class="goal-card__content">


        <h3>

          ${goal.title}

        </h3>



        <p>

          ${goal.details}

        </p>



      </div>







      <div class="goal-card__buttons">



        <button

          class="goal-card__btn complete-btn"

          data-index="${index}"

        >

          ${goal.completed ? "Completed" : "Complete"}


        </button>






        <button

          class="goal-card__btn edit-btn"

          data-index="${index}"

        >

          Edit

        </button>






        <button

          class="goal-card__btn delete-btn"

          data-index="${index}"

        >

          Delete

        </button>




      </div>



    `;

    goalList.appendChild(goalCard);
  });
}

renderGoals();

// ==========================
// Add / Update Goal
// ==========================

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = goalTitleInput.value.trim();

  const details = goalDetailsInput.value.trim();

  if (title === "" || details === "") {
    alert("Please fill all fields");

    return;
  }

  const goalObject = {
    title,

    details,

    completed: false,
  };

  // Update Existing Goal

  if (editGoalIndex !== null) {
    goalObject.completed = goals[editGoalIndex].completed;

    goals[editGoalIndex] = goalObject;

    editGoalIndex = null;
  }

  // Add New Goal
  else {
    goals.push(goalObject);
  }

  saveGoals();

  renderGoals();

  goalForm.reset();
});

// ==========================
// Save Goals
// ==========================

function saveGoals() {
  localStorage.setItem(
    "goals",

    JSON.stringify(goals),
  );
}

// ==========================
// Goal Actions
// Event Delegation
// ==========================

goalList.addEventListener("click", (event) => {
  const index = event.target.dataset.index;

  // Delete

  if (event.target.classList.contains("delete-btn")) {
    goals.splice(index, 1);

    saveGoals();

    renderGoals();
  }

  // Edit

  if (event.target.classList.contains("edit-btn")) {
    const selectedGoal = goals[index];

    goalTitleInput.value = selectedGoal.title;

    goalDetailsInput.value = selectedGoal.details;

    editGoalIndex = index;
  }

  // Complete

  if (event.target.classList.contains("complete-btn")) {
    goals[index].completed = !goals[index].completed;

    saveGoals();

    renderGoals();
  }
});

// ===========================
// Motivational Quotes Modal
// ===========================

const quotesModal = document.querySelector(".quotes-modal");
const quotesBtn = document.querySelector(".motivate");
const quotesCloseBtn = document.querySelector(".quotes-modal__close");

quotesBtn.addEventListener("click", () => {
  quotesModal.style.display = "flex";
});

quotesCloseBtn.addEventListener("click", () => {
  quotesModal.style.display = "none";
});

// ===========================
// Motivational Quotes API
// ===========================

const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");

const API_KEY = `DXgx56BhRuHTfFaEz13q9IoCxCt4gjlY1YPBPh8F`;
const category = `quotes`;
const API_URL = `https://api.api-ninjas.com/v1/${category}`;

async function loadQuote() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    const data = await response.json();

    const { quote, author } = data[0];

    quoteText.textContent = quote;
    quoteAuthor.textContent = `— ${author}`;
  } catch (error) {
    console.error(error);

    quoteText.textContent =
      "Stay positive. Keep learning. Success will follow.";
    quoteAuthor.textContent = "— Unknown";
  }
}

loadQuote();

// ===========================
// Study With Me Modal
// ===========================

const studyBtn = document.querySelector(".timer");
const studyModal = document.querySelector(".study-modal");
const studyCloseBtn = document.querySelector(".study-modal__close");

studyBtn.addEventListener("click", () => {
  studyModal.style.display = "flex";
});

studyCloseBtn.addEventListener("click", () => {
  studyModal.style.display = "none";
});

const timerDisplay = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

const WORK_DURATION = 25 * 60 * 1000; // 25 minutes
let timerId = null;
let startTime = 0;
let remainingTime = WORK_DURATION;
let isRunning = false;

// Event Listeners

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// ===========================
// Start Timer
// ===========================

function startTimer() {
  if (isRunning) return;
  startTime = Date.now();
  timerId = setInterval(updateTimer, 1000);
  isRunning = true;
}

// ===========================
// Update Timer
// ===========================

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const timeLeft = remainingTime - elapsedTime;

  if (timeLeft <= 0) {
    clearInterval(timerId);
    isRunning = false;
    timerDisplay.textContent = "00:00";
    alert("🎉 Time's up! Take a break.");
    return;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ===========================
// Pause Timer
// ===========================

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timerId);
  remainingTime -= Date.now() - startTime;
  isRunning = false;
}

// ===========================
// Reset Timer
// ===========================

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  remainingTime = WORK_DURATION;
  timerDisplay.textContent = "25:00";
}

// Daily Planner Overlay

const dailyPlannerBtn = document.querySelector(".daily");
const dailyPlannerModal = document.querySelector(".daily-planner");
const dailyPlannerCloseBtn = document.querySelector(".daily-planner__close");

dailyPlannerBtn.addEventListener("click", () => {
  dailyPlannerModal.style.display = "block";
});

dailyPlannerCloseBtn.addEventListener("click", () => {
  dailyPlannerModal.style.display = "none";
});

// background videos and digit clock

// function changeBackgroundVideo() {
//   const hour = new Date().getHours();

//   const video = document.getElementById("bg-video");
//   const source = document.getElementById("video-source");

//   if (hour >= 6 && hour < 12) {
//     // Morning / Day
//     source.src = "assets/videos/1.mp4";
//   } else if (hour >= 12 && hour < 18) {
//     // Afternoon
//     source.src = "assets/videos/2.mp4";
//   } else {
//     // Night
//     source.src = "assets/videos/3.mp4";
//   }

//   video.load(); // New video load karega
// }

// function updateClock() {
//   function initClock() {
//     updateClock();
//     window.setInterval("updateClock()", 1);
//   }

//   function updateClock() {
//     var now = new Date();
//     var dname = now.getDay();
//     mo = now.getMonth();
//     dnum = now.getDate();
//     yr = now.getFullYear();
//     hou = now.getHours();
//     min = now.getMinutes();
//     sec = now.getSeconds();
//     pe = "AM";
//     if (hou == 0) {
//       hou = 12;
//     }
//     if (hou > 12) {
//       hou = hou - 12;
//       pe = "PM";
//     }
//     Number.prototype.pad = function (digits) {
//       let n = this.toString();
//       while (n.length < digits) {
//         n = "0" + n;
//       }
//       return n;
//     };
//     const ids = [
//       "dayname",
//       "month",
//       "daynum",
//       "year",
//       "hour",
//       "minutes",
//       "seconds",
//       "period",
//     ];
//     var months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     var weeks = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];
//     var values = [
//       dnum.pad(2),
//       months[mo],
//       yr,
//       weeks[dname],
//       hou.pad(2),
//       min.pad(2),
//       sec.pad(2),
//       pe,
//     ];
//     for (let i = 0; i < ids.length; i++) {
//       document.getElementById(ids[i]).firstChild.nodeValue = values[i];
//     }
//   }

//   changeBackgroundVideo();
// }

// function initClock() {
//   updateClock();
//   window.setInterval(updateClock(), 1000);
// }
// initClock();
// changeBackgroundVideo();
// setInterval(changeBackgroundVideo, 60000);
