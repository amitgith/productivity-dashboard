const form1 = document.querySelector("form");
const inp1 = document.querySelector("#task1");
const textArea = document.querySelector("#details");
const checkBox = document.querySelector("#check");
const todoBox = document.querySelector(".todo-list");

let task1Data = [
  {
    task1: "Test1",
    text: "Write Something...",
  },
];
const task1Ui = () => {
  todoBox.innerHTML = "";
  task1Data.forEach((elem, index) => {
    todoBox.innerHTML += `   <div class="li">
              <h3>${elem.task1} <sup>imp</sup></h3>
              <p>${elem.text}</p>
              <div class="btns">
                <button class="btn" id="edit1">Edit</button>
                <button onclick="deleteTask1(${index})" class="btn" id="del1">Delete</button>
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

  task1Data.push({
    task1,
    text,
    check,
  });
  task1Ui();

  form1.reset();
});

const deleteTask1 = (index) => {
  task1Data.splice(index, 1);
  task1Ui();
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
