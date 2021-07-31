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

function setTodo() {
  for (let i = 0; i < todoArr.length; i++) {
    insertTodo(i, todoArr[i]);
  }
}

function insertTodo(num, text) {
  const todo = document.querySelector(`#todo${num}`);
  todo.innerHTML = `<button><i class="far fa-circle"></i></button>${text}
                    <div style="width:100%" align="right">
                      <i class="fas fa-trash-alt" id ="trash${num}"></i>
                    </div>`;
  todo.classList.add("todoEntered");
  const trash = document.querySelector(`#trash${num}`);
  trash.addEventListener("click", deleteTodo);
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

//delete todo
function deleteTodo(event) {
  const delId = Number(event.target.id[5]);
  console.log(delId);
  for (let i = delId; i < todoArr.length; i++) {
    if (i === todoArr.length - 1) {
      const delTarget = document.querySelector(`#todo${i}`);
      delTarget.innerText = "";
      break;
    }
    todoArr[i] = todoArr[i + 1];
    insertTodo(i, todoArr[i]);
  }
  todoArr.pop();
  localStorage.setItem("todos", todoArr);
}
