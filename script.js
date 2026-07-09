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
const nextQuoteBtn = document.querySelector(".quotes-card__next");

// ======================================
// Open Quotes Modal
// ======================================

quotesBtn.addEventListener("click", () => {
  quotesModal.style.display = "flex";
  loadQuote();
});

// ======================================
// Close Quotes Modal
// ======================================

quotesCloseBtn.addEventListener("click", () => {
  quotesModal.style.display = "none";
});

// Optional: Close when clicking outside the card
quotesModal.addEventListener("click", (e) => {
  if (e.target === quotesModal) {
    quotesModal.style.display = "none";
  }
});

// ======================================
// Quotes API
// ======================================

const API_KEY = "DXgx56BhRuHTfFaEz13q9IoCxCt4gjlY1YPBPh8F";
const API_URL = "https://api.api-ninjas.com/v1/quotes";

// ======================================
// Load Quote
// ======================================

async function loadQuote(showCached = true) {
  // Show cached quote only when opening the modal/page
  if (showCached) {
    const savedQuote = localStorage.getItem("quote");
    const savedAuthor = localStorage.getItem("author");

    if (savedQuote && savedAuthor) {
      quoteText.textContent = savedQuote;
      quoteAuthor.textContent = `— ${savedAuthor}`;
    }
  }

  // Loading State
  nextQuoteBtn.disabled = true;
  nextQuoteBtn.textContent = "Loading...";

  quoteText.textContent = "Loading quote...";
  quoteAuthor.textContent = "";

  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No quote received.");
    }

    const { quote, author } = data[0];

    // Update UI
    quoteText.textContent = quote;
    quoteAuthor.textContent = `— ${author}`;

    // Save in localStorage
    localStorage.setItem("quote", quote);
    localStorage.setItem("author", author);
  } catch (error) {
    console.error("Quote API Error:", error);

    const savedQuote = localStorage.getItem("quote");
    const savedAuthor = localStorage.getItem("author");

    if (savedQuote && savedAuthor) {
      quoteText.textContent = savedQuote;
      quoteAuthor.textContent = `— ${savedAuthor}`;
    } else {
      quoteText.textContent =
        "Stay positive. Keep learning. Success will follow.";
      quoteAuthor.textContent = "— Unknown";
    }
  } finally {
    nextQuoteBtn.disabled = false;
    nextQuoteBtn.textContent = "Next Quote";
  }
}

// ======================================
// Next Quote Button
// ======================================

nextQuoteBtn.addEventListener("click", () => {
  // Don't show cached quote when requesting a new one
  loadQuote(false);
});

// ======================================
// Load Quote on Page Load
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  loadQuote();
});

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

// Restore last state
const modalState = localStorage.getItem("dailyPlannerModal");

if (modalState === "open") {
  dailyPlannerModal.style.display = "block";
} else {
  dailyPlannerModal.style.display = "none";
}

// Open
dailyPlannerBtn.addEventListener("click", () => {
  dailyPlannerModal.style.display = "block";
  localStorage.setItem("dailyPlannerModal", "open");
});

// Close
dailyPlannerCloseBtn.addEventListener("click", () => {
  dailyPlannerModal.style.display = "none";
  localStorage.setItem("dailyPlannerModal", "closed");
});

// Outside Click
dailyPlannerModal.addEventListener("click", (event) => {
  if (event.target === dailyPlannerModal) {
    dailyPlannerModal.style.display = "none";
    localStorage.setItem("dailyPlannerModal", "closed");
  }
});

// ===============================
// Daily Planner - Auto Save
// ===============================

const plannerInputs = document.querySelectorAll(".time-slot input");

// Load saved data
plannerInputs.forEach((input, index) => {
  const savedValue = localStorage.getItem(`planner-${index}`);

  if (savedValue) {
    input.value = savedValue;
  }

  // Save on typing
  input.addEventListener("input", () => {
    localStorage.setItem(`planner-${index}`, input.value);
  });
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

// ===============================
// Theme Toggle
// ===============================

const themeToggle = document.getElementById("theme-toggle");
const dayIcon = document.querySelector(".day");
const nightIcon = document.querySelector(".night");

// Restore saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  dayIcon.classList.add("hide");
  nightIcon.classList.remove("hide");
  backgroundImage.src = "assets/images/night.jpg";
} else {
  document.body.classList.remove("dark");
  dayIcon.classList.remove("hide");
  nightIcon.classList.add("hide");
  updateBackground();
}

// Toggle Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    dayIcon.classList.add("hide");
    nightIcon.classList.remove("hide");

    backgroundImage.src = "assets/images/night.jpg";

    localStorage.setItem("theme", "dark");
  } else {
    dayIcon.classList.remove("hide");
    nightIcon.classList.add("hide");

    updateBackground();

    localStorage.setItem("theme", "light");
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

const cityInput = document.querySelector("#cityInput");
const searchCityBtn = document.querySelector("#searchCityBtn");
const currentLocationBtn = document.querySelector("#currentLocationBtn");

// ==============================
// Fetch Weather By City
// ==============================

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await response.json();

    updateWeatherUI(data);

    localStorage.setItem("selectedCity", data.name);
  } catch (error) {
    console.error(error);

    cityName.textContent = "City not found";
    temperature.textContent = "--°C";
    weatherCondition.textContent = "Weather unavailable";
    humidity.textContent = "Humidity: --";
  }
}

// ==============================
// Fetch Weather By Coordinates
// ==============================

async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await response.json();

    updateWeatherUI(data);

    localStorage.setItem("selectedCity", data.name);
  } catch (error) {
    console.error(error);
  }
}

// ==============================
// Update UI
// ==============================

function updateWeatherUI(data) {
  cityName.textContent = data.name;

  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  weatherCondition.textContent = data.weather[0].description;

  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherIcon.alt = data.weather[0].main;
}

// ==============================
// Search Button
// ==============================

searchCityBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) return;

  getWeather(city);

  cityInput.value = "";
});

// ==============================
// Enter Key
// ==============================

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchCityBtn.click();
  }
});

// ==============================
// Current Location
// ==============================

currentLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      getWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    () => {
      alert("Location permission denied.");
    },
  );
});

// ==============================
// Initial Load
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("selectedCity");

  if (savedCity) {
    getWeather(savedCity);
  } else {
    currentLocationBtn.click();
  }
});

updateBackground();

getWeather();

// ======================================
// Initialize Dashboard
// ======================================

setInterval(updateBackground, 60000);
