// ======================================
// Personalized Task Manager
// ======================================

// Elements
const taskForm = document.querySelector("#taskForm");
const taskTitleInput = document.querySelector("#taskTitle");
const taskDetailsInput = document.querySelector("#taskDetails");
const importantTaskInput = document.querySelector("#importantTask");
const taskList = document.querySelector("#taskList");

const taskModal = document.querySelector(".task-modal");
const taskOpenBtn = document.querySelector(".feature-card.todo");
const taskCloseBtn = document.querySelector(".task-modal__close");

// Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editTaskIndex = null;

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");

    taskCard.className = `
      task-card 
      ${task.completed ? "task-card--completed" : ""}
    `;

    taskCard.innerHTML = `
      <div class="task-card__content">

        <h3>
          ${task.title}
          ${task.isImportant ? "<sup>IMP</sup>" : ""}
        </h3>

        <p>${task.details}</p>

      </div>


      <div class="task-card__buttons">

        <button 
          class="task-card__btn complete-btn"
          data-index="${index}">
          ${task.completed ? "Completed" : "Complete"}
        </button>


        <button 
          class="task-card__btn edit-btn"
          data-index="${index}">
          Edit
        </button>


        <button 
          class="task-card__btn delete-btn"
          data-index="${index}">
          Delete
        </button>

      </div>
    `;

    taskList.appendChild(taskCard);
  });
}

renderTasks();

// Add / Update Task

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const details = taskDetailsInput.value.trim();
  const isImportant = importantTaskInput.checked;

  if (!title || !details) {
    alert("Please fill all fields");

    return;
  }

  const taskData = {
    title,
    details,
    isImportant,
    completed: false,
  };

  // Update Task

  if (editTaskIndex !== null) {
    taskData.completed = tasks[editTaskIndex].completed;

    tasks[editTaskIndex] = taskData;

    editTaskIndex = null;
  }

  // New Task
  else {
    tasks.push(taskData);
  }

  saveTasks();

  renderTasks();

  taskForm.reset();
});

// Save Tasks

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Task Actions

taskList.addEventListener("click", (event) => {
  const index = event.target.dataset.index;

  // Delete

  if (event.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
  }

  // Edit

  if (event.target.classList.contains("edit-btn")) {
    const selectedTask = tasks[index];

    taskTitleInput.value = selectedTask.title;

    taskDetailsInput.value = selectedTask.details;

    importantTaskInput.checked = selectedTask.isImportant;

    editTaskIndex = index;
  }

  // Complete

  if (event.target.classList.contains("complete-btn")) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks();
  }
});

// Task Modal Open

taskOpenBtn.addEventListener("click", () => {
  taskModal.style.display = "block";
});

// Task Modal Close

taskCloseBtn.addEventListener("click", () => {
  taskModal.style.display = "none";
});

// Outside Click Close

taskModal.addEventListener("click", (event) => {
  if (event.target === taskModal) {
    taskModal.style.display = "none";
  }
});

// ======================================
// Daily Goal Manager
// ======================================

const goalOpenBtn = document.querySelector(".feature-card.goal");

const goalModal = document.querySelector(".goal-modal");

const goalCloseBtn = document.querySelector(".goal-modal__close");

const goalForm = document.querySelector("#goalForm");

const goalTitleInput = document.querySelector("#goalTitle");

const goalDetailsInput = document.querySelector("#goalDetails");

const goalList = document.querySelector("#goalList");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

let editGoalIndex = null;

// Open Goal Modal

goalOpenBtn.addEventListener("click", () => {
  goalModal.style.display = "block";
});

// Close Goal Modal

goalCloseBtn.addEventListener("click", () => {
  goalModal.style.display = "none";
});

goalModal.addEventListener("click", (event) => {
  if (event.target === goalModal) {
    goalModal.style.display = "none";
  }
});

// Render Goals

function renderGoals() {
  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const goalCard = document.createElement("div");

    goalCard.className = `
    goal-card
    ${goal.completed ? "goal-card--completed" : ""}
    `;

    goalCard.innerHTML = `

    <div class="goal-card__content">

      <h3>${goal.title}</h3>

      <p>${goal.details}</p>

    </div>



    <div class="goal-card__buttons">


      <button 
      class="goal-card__btn complete-btn"
      data-index="${index}">
      ${goal.completed ? "Completed" : "Complete"}
      </button>



      <button
      class="goal-card__btn edit-btn"
      data-index="${index}">
      Edit
      </button>



      <button
      class="goal-card__btn delete-btn"
      data-index="${index}">
      Delete
      </button>



    </div>

    `;

    goalList.appendChild(goalCard);
  });
}

renderGoals();

// Add / Update Goal

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = goalTitleInput.value.trim();

  const details = goalDetailsInput.value.trim();

  if (!title || !details) {
    alert("Please fill all fields");

    return;
  }

  const goalObject = {
    title,

    details,

    completed: false,
  };

  if (editGoalIndex !== null) {
    goalObject.completed = goals[editGoalIndex].completed;

    goals[editGoalIndex] = goalObject;

    editGoalIndex = null;
  } else {
    goals.push(goalObject);
  }

  saveGoals();

  renderGoals();

  goalForm.reset();
});

// Save Goals

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

// Goal Actions

goalList.addEventListener("click", (event) => {
  const index = event.target.dataset.index;

  if (event.target.classList.contains("delete-btn")) {
    goals.splice(index, 1);

    saveGoals();

    renderGoals();
  }

  if (event.target.classList.contains("edit-btn")) {
    const selectedGoal = goals[index];

    goalTitleInput.value = selectedGoal.title;

    goalDetailsInput.value = selectedGoal.details;

    editGoalIndex = index;
  }

  if (event.target.classList.contains("complete-btn")) {
    goals[index].completed = !goals[index].completed;

    saveGoals();

    renderGoals();
  }
});

// ======================================
// Motivational Quotes Modal
// ======================================

const quotesModal = document.querySelector(".quotes-modal");

const quotesBtn = document.querySelector(".motivate");

const quotesCloseBtn = document.querySelector(".quotes-modal__close");

const quoteText = document.querySelector("#quote");

const quoteAuthor = document.querySelector("#author");

// Open Quotes Modal

quotesBtn.addEventListener("click", () => {
  quotesModal.style.display = "flex";

  loadQuote();
});

// Close Quotes Modal

quotesCloseBtn.addEventListener("click", () => {
  quotesModal.style.display = "none";
});

// ======================================
// Quotes API
// ======================================

const API_KEY = "DXgx56BhRuHTfFaEz13q9IoCxCt4gjlY1YPBPh8F";

const API_URL = "https://api.api-ninjas.com/v1/quotes";

async function loadQuote() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    const data = await response.json();

    quoteText.textContent = data[0].quote;

    quoteAuthor.textContent = `— ${data[0].author}`;
  } catch (error) {
    console.error(error);

    quoteText.textContent =
      "Stay positive. Keep learning. Success will follow.";

    quoteAuthor.textContent = "— Unknown";
  }
}

// ======================================
// Study With Me Modal
// ======================================

const studyBtn = document.querySelector(".timer");

const studyModal = document.querySelector(".study-modal");

const studyCloseBtn = document.querySelector(".study-modal__close");

studyBtn.addEventListener("click", () => {
  studyModal.style.display = "flex";
});

studyCloseBtn.addEventListener("click", () => {
  studyModal.style.display = "none";
});

// Timer Elements

const timerDisplay = document.querySelector("#timer");

const startBtn = document.querySelector("#startBtn");

const pauseBtn = document.querySelector("#pauseBtn");

const resetBtn = document.querySelector("#resetBtn");

const WORK_DURATION = 25 * 60 * 1000;

let timerId = null;

let startTime = 0;

let remainingTime = WORK_DURATION;

let isRunning = false;

// Buttons

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

// Start Timer

function startTimer() {
  if (isRunning) return;

  startTime = Date.now();

  timerId = setInterval(updateTimer, 1000);

  isRunning = true;
}

// Update Timer

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

// Pause Timer

function pauseTimer() {
  if (!isRunning) return;

  clearInterval(timerId);

  remainingTime -= Date.now() - startTime;

  isRunning = false;
}

// Reset Timer

function resetTimer() {
  clearInterval(timerId);

  isRunning = false;

  remainingTime = WORK_DURATION;

  timerDisplay.textContent = "25:00";
}

// ======================================
// Daily Planner Modal
// ======================================

const dailyPlannerBtn = document.querySelector(".daily");

const dailyPlannerModal = document.querySelector(".daily-planner");

const dailyPlannerCloseBtn = document.querySelector(".daily-planner__close");

// Open

dailyPlannerBtn.addEventListener("click", () => {
  dailyPlannerModal.style.display = "block";
});

// Close

dailyPlannerCloseBtn.addEventListener("click", () => {
  dailyPlannerModal.style.display = "none";
});

// Outside Click

dailyPlannerModal.addEventListener("click", (event) => {
  if (event.target === dailyPlannerModal) {
    dailyPlannerModal.style.display = "none";
  }
});

// ================================
// Weather Elements
// ================================

const cityName = document.getElementById("city");

const temperature = document.getElementById("temperature");

const weatherCondition = document.getElementById("condition");

const humidity = document.getElementById("humidity");

const weatherIcon = document.getElementById("weather-icon");

// ================================
// Clock Elements
// ================================

const dayName = document.getElementById("dayname");

const month = document.getElementById("month");

const dayNum = document.getElementById("daynum");

const year = document.getElementById("year");

const hour = document.getElementById("hour");

const minutes = document.getElementById("minutes");

const seconds = document.getElementById("seconds");

const period = document.getElementById("period");

// ======================================
// Background Image Change
// ======================================
const backgroundImage = document.getElementById("bg-image");

function updateBackground() {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    backgroundImage.src = "assets/images/morning.jpg";
  } else if (currentHour >= 12 && currentHour < 18) {
    backgroundImage.src = "assets/images/afternoon.jpg";
  } else {
    backgroundImage.src = "assets/images/night.jpg";
  }
}

// Theme Toggle

const themeToggle = document.getElementById("theme-toggle");

const dayIcon = document.querySelector(".day");
const nightIcon = document.querySelector(".night");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  dayIcon.classList.toggle("hide");
  nightIcon.classList.toggle("hide");

  if (document.body.classList.contains("dark")) {
    backgroundImage.src = "assets/images/night.jpg";
  } else {
    updateBackground();
  }
});

// ======================================
// Digital Clock
// ======================================

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function updateClock() {
  const now = new Date();

  let currentHour = now.getHours();

  let currentPeriod = "AM";

  if (currentHour >= 12) {
    currentPeriod = "PM";
  }

  if (currentHour > 12) {
    currentHour -= 12;
  }

  if (currentHour === 0) {
    currentHour = 12;
  }

  dayName.textContent = weekDays[now.getDay()];

  month.textContent = months[now.getMonth()];

  dayNum.textContent = String(now.getDate()).padStart(2, "0");

  year.textContent = now.getFullYear();

  hour.textContent = String(currentHour).padStart(2, "0");

  minutes.textContent = String(now.getMinutes()).padStart(2, "0");

  seconds.textContent = String(now.getSeconds()).padStart(2, "0");

  period.textContent = currentPeriod;
}

// Start Clock

updateClock();

setInterval(updateClock, 1000);

// ======================================
// Weather API
// ======================================

const WEATHER_KEY = "d73b5a1809a6a9d9b29561cc7d693bf6";

const CITY = "London";

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${WEATHER_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await response.json();

    cityName.textContent = data.name;

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    weatherCondition.textContent = data.weather[0].description;

    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].main;
  } catch (error) {
    console.error(error);

    cityName.textContent = "Unable to load";

    temperature.textContent = "--°C";

    weatherCondition.textContent = "Weather unavailable";

    humidity.textContent = "Humidity: --";
  }
}

updateBackground();

getWeather();

// ======================================
// Initialize Dashboard
// ======================================

setInterval(updateBackground, 60000);
