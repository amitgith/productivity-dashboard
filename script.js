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

// Motivational Quotes in clicked
const motivateBox = document.querySelector(".quote-parent");
const motivateImgBtn = document.querySelector(".motivate");
const motivateClose = document.querySelector(".quote-close");

motivateImgBtn.addEventListener("click", () => {
  motivateBox.style.display = "block";
});

motivateClose.addEventListener("click", () => {
  motivateBox.style.display = "none";
});

// Motivational Quotes API
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

const key = `DXgx56BhRuHTfFaEz13q9IoCxCt4gjlY1YPBPh8F`;
const category = `quotes`;
const url = `https://api.api-ninjas.com/v1/${category}`;

fetch(url, {
  headers: {
    "X-Api-Key": key,
  },
})
  .then((res) => res.json())
  .then((data) => {
    quote.textContent = data[0].quote;
    author.textContent = data[0].author;
  })
  .catch((err) => console.error(err));
