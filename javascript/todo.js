const todoInput = document.querySelector("#todoInput");
const icon = document.querySelector("#icon");
todoInput.addEventListener("focus", () => {
  icon.innerHTML = '<i class="far fa-circle"></i>';
});

todoInput.addEventListener("focusout", () => {
  icon.innerHTML = '<i class="fas fa-plus"></i>';
});

const form = document.querySelector("form");
form.addEventListener("submit", addTodo);

function addTodo(event) {
  event.preventDefault();
  const input = todoInput;
  for (let i = 1; i < 16; i++) {
    const todo = document.querySelector(`#todo${i}`);
    if (todo.innerText === "") {
      todo.innerHTML = `<button><i class="far fa-circle"></i></button>${input.value}`;
      todo.classList.add("todoEntered");
      /*todo.addEventListener("click", () => {
        alert("clicked!");
      });*/ //나중에 토글 적용!
      if (localStorage.getItem("todos")) {
      }
      break;
    }
  }
  input.value = "";
}
