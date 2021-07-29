// set event of todo input
const todoInput = document.querySelector("#todoInput");
const icon = document.querySelector("#icon");
todoInput.addEventListener("focus", () => {
  icon.innerHTML = '<i class="far fa-circle"></i>';
});

todoInput.addEventListener("focusout", () => {
  icon.innerHTML = '<i class="fas fa-plus"></i>';
});

// when input is submitted
const form = document.querySelector("form");
form.addEventListener("submit", whenSubmitted);

const todoArr = getTodosFromLocal();

function getTodosFromLocal() {
  let todosFromLocal = localStorage.getItem("todos");
  if (todosFromLocal) {
    todosFromLocal = todosFromLocal.split(",");
    return todosFromLocal;
  }
  return [];
}

function whenSubmitted(event) {
  event.preventDefault();
  const input = todoInput;
  for (let i = 0; i < 15; i++) {
    const todo = document.querySelector(`#todo${i}`);
    if (todo.innerText === "") {
      insertTodo(i, input.value);
      todoArr.push(input.value);
      localStorage.setItem("todos", todoArr);
      break;
    }
  }
  input.value = "";
}

//first setting
const rightBanner = document.querySelector("#popUpTodo");

function setTodo() {
  for (let i = 0; i < todoArr.length; i++) {
    insertTodo(i, todoArr[i]);
  }
  rightBanner.style.display = "none";
}

function insertTodo(num, text) {
  const todo = document.querySelector(`#todo${num}`);
  todo.innerHTML = `<button><i class="far fa-circle"></i></button>${text}`;
  todo.classList.add("todoEntered");
  todo.addEventListener("click", popUp);
}

function popUp(event) {
  rightBanner.style.display = "block";
  rightBanner.innerText = event.target.innerText;
}

setTodo();

//today setting
setInterval(setTime, 1000);
setTime();
function setTime() {
  const dayArr = ["", "월", "화", "수", "목", "금", "토", "일"];
  const today = document.querySelector("#date");
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  today.innerText = `${month}월 ${date}일, ${dayArr[day]}요일`;
}
