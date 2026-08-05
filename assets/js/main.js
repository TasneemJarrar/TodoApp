const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");

const todoItemBtnStyles = "text-white border-0 m-0 p-4 cursor-pointer";
const fall = "scale-0 opacity-0";

// Event Listeners
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheck);
todoFilter.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  const filter = btn.dataset.filter;
  filterTasks(filter);
});
document.addEventListener("DOMContentLoaded", getsTodos);

// Functions
function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add(
    "flex",
    "justify-between",
    "bg-white",
    "text-black",
    "items-center",
    "transition-all",
    "duration-300",
    "ease-in-out",
  );

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item", "flex-1", "p-4");
  todoDiv.appendChild(newTodo);

  saveLocalTodo(todoInput.value);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none" width="24" height="24" viewBox="0 0 1024 1024">
	<path fill="currentColor" fill-opacity=".15" d="M292.7 840h438.6l24.2-512h-487z" />
	<path fill="currentColor" d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z" />
</svg>
`;
  trashBtn.classList.add(
    "trash-btn",
    "bg-orange-500",
    ...todoItemBtnStyles.split(" "),
  );
  todoDiv.appendChild(trashBtn);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M5 19h14V5H5zm2.41-7.4l2.58 2.58l6.59-6.59L17.99 9l-8 8L6 13.01z" opacity=".3" />
	<path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM17.99 9l-1.41-1.42l-6.59 6.59l-2.58-2.57l-1.42 1.41l4 3.99z" />
</svg>
`;
  completedBtn.classList.add(
    "complete-btn",
    "bg-green-500",
    ...todoItemBtnStyles.split(" "),
  );
  todoDiv.appendChild(completedBtn);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteOrCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add(...fall.split(" "));
    todo.addEventListener("transitionend", () => {
      todo.remove();
      removeLocalTodo(todo);
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("line-through");
    todo.classList.toggle("opacity-50");
  }
}

function filterTasks(filter) {
  const todos = Array.from(todoList.children);
  todos.forEach((todo) => {
    switch (filter) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("line-through")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("line-through")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkStorage() {
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function getsTodos() {
  checkStorage();
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add(
      "flex",
      "justify-between",
      "bg-white",
      "text-black",
      "items-center",
      "transition-all",
      "duration-300",
      "ease-in-out",
    );

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item", "flex-1", "p-4");
    todoDiv.appendChild(newTodo);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none" width="24" height="24" viewBox="0 0 1024 1024">
	<path fill="currentColor" fill-opacity=".15" d="M292.7 840h438.6l24.2-512h-487z" />
	<path fill="currentColor" d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z" />
</svg>
`;
    trashBtn.classList.add(
      "trash-btn",
      "bg-orange-500",
      ...todoItemBtnStyles.split(" "),
    );
    todoDiv.appendChild(trashBtn);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M5 19h14V5H5zm2.41-7.4l2.58 2.58l6.59-6.59L17.99 9l-8 8L6 13.01z" opacity=".3" />
	<path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM17.99 9l-1.41-1.42l-6.59 6.59l-2.58-2.57l-1.42 1.41l4 3.99z" />
</svg>
`;
    completedBtn.classList.add(
      "complete-btn",
      "bg-green-500",
      ...todoItemBtnStyles.split(" "),
    );
    todoDiv.appendChild(completedBtn);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  checkStorage();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todo.children[0].innerText), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
