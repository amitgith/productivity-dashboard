const form1 = document.querySelector("form");
const inp1 = document.querySelector("#task");
const textArea = document.querySelector("#details");
const checkBox = document.querySelector("#check");
const todoBox = document.querySelector(".todo-list");

let task1Data = JSON.parse(localStorage.getItem("tasks")) || [];

let updateIndex = null;

const task1Ui = () => {
  todoBox.innerHTML = "";
  task1Data.forEach((elem, index) => {
    todoBox.innerHTML += `   <div class="li">
              <h3>${elem.task1} <sup>imp</sup></h3>
              <p>${elem.text}</p>
              <div class="btns">
                <button onclick="editTask('${elem.task1}')" class="btn" id="edit1">Edit</button>
                <button onclick="deleteTask(${index})" class="btn" id="del1">Delete</button>
              </div>
            </div>`;
  });
};
task1Ui();

form1.addEventListener("submit", (events) => {
  events.preventDefault();
  let task1 = inp1.value;
  let text = textArea.value;
  let check = checkBox.value;
  if (task1.trim() === "" || text.trim() === "" || check.trim() === "") {
    alert("Filled all input");
    return;
  }

  let obj = {
    task1,
    text,
    check,
  };

  if (updateIndex !== null) {
    task1Data[updateIndex] = obj;
    updateIndex = null;
    localStorage.setItem("tasks", JSON.stringify(task1Data));
  } else {
    task1Data.push(obj);
    localStorage.setItem("tasks", JSON.stringify(task1Data));
  }

  task1Ui();

  form1.reset();
});

const deleteTask = (index) => {
  task1Data.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(task1Data));
  task1Ui();
};

const editTask = (name) => {
  let task = task1Data.find((elem) => elem.task1 === name);
  updateIndex = task1Data.findIndex((elem) => elem.task1 === name);
  form1[0].value = task.task1;
  form1[1].value = task.text;
  form1[2].value = task.check;
};

// clicked karke task list ko lana hai ok

const taskImgBtn = document.querySelector(".todo");
const closeBtn = document.querySelector(".task-close");
const taskContainer = document.querySelector(".task-container");

taskImgBtn.addEventListener("click", () => {
  taskContainer.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  taskContainer.style.display = "none";
});

// clicked karke goal list ko lana hai ok

const goalImgbtn = document.querySelector(".goal");
const goalContainer = document.querySelector(".goal-container");
const goalBtn = document.querySelector(".goal-close");

goalImgbtn.addEventListener("click", () => {
  goalContainer.style.display = "block";
});

goalBtn.addEventListener("click", () => {
  goalContainer.style.display = "none";
});

// goal input selected fields
const form2 = document.querySelector("#form-goal-container");
const goalBox = document.querySelector(".goal-list");
const textArea1 = document.querySelector("#detailsgoal");
const inp2 = document.querySelector("#goal");

let goalData = JSON.parse(localStorage.getItem("goals")) || [];

let updateIndex1 = null;

const goalUi = () => {
  goalBox.innerHTML = "";
  goalData.forEach((elem, index) => {
    goalBox.innerHTML += `   <div class="li">
              <h3>${elem.goal}</h3>
              <p>${elem.text1}</p>
              <div class="btns">
                <button onclick="editGoal('${elem.goal}')" class="btn1" id="edit2">Edit</button>
                <button onclick="deleteGoal(${index})" class="btn1" id="del2">Delete</button>
              </div>
            </div>`;
  });
};
goalUi();

form2.addEventListener("submit", (events) => {
  events.preventDefault();
  let goal = inp2.value;
  let text1 = textArea1.value;
  if (goal.trim() === "" || text1.trim() === "") {
    alert("Filled all input");
    return;
  }

  let obj1 = {
    goal,
    text1,
  };

  if (updateIndex1 !== null) {
    goalData[updateIndex1] = obj1;
    updateIndex1 = null;
    localStorage.setItem("goals", JSON.stringify(goalData));
  } else {
    goalData.push(obj1);
    localStorage.setItem("goals", JSON.stringify(goalData));
  }

  goalUi();

  form2.reset();
});

const deleteGoal = (index) => {
  goalData.splice(index, 1);
  localStorage.setItem("goals", JSON.stringify(goalData));
  goalUi();
};

const editGoal = (name) => {
  let goal = goalData.find((elem) => elem.goal === name);
  updateIndex1 = goalData.findIndex((elem) => elem.goal === name);
  form2[0].value = goal.goal;
  form2[1].value = goal.text1;
};

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
