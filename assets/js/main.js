const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");
const emptyTask = document.querySelector(".emptyTask");

const todoItemBtnStyles = "text-white border-0 m-0 py-4 px-2 cursor-pointer";
const fall = "scale-0 opacity-0";

// Event Listeners
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrCheck);
todoFilter.addEventListener("click", (e) => {
  const option = e.target.closest(".filter");
  const filter = option.value;
  console.log(filter);
});
document.addEventListener("DOMContentLoaded", getsTodos);

// Functions
function addTodo(e) {
  e.preventDefault();
  const task = todoInput.value.trim();

  if (!task) {
    emptyTask.classList.remove("hidden");
    return;
  }

  emptyTask.classList.add("hidden");

  const todoDiv = document.createElement("div");
  todoDiv.classList.add(
    "flex",
    "justify-between",
    "bg-slate-100/30",
    "text-black",
    "items-center",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "rounded-sm",
  );

  const newTodo = document.createElement("li");
  newTodo.innerText = task;
  newTodo.classList.add("todo-item", "flex-1", "p-4", "text-white");
  todoDiv.appendChild(newTodo);

  saveLocalTodo(task);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none group-hover:text-rose-400" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-6.287 10.713Q11 16.425 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288M7 6v13z" />
</svg>

    `;
  trashBtn.classList.add("trash-btn", "group", ...todoItemBtnStyles.split(" "));
  todoDiv.appendChild(trashBtn);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none fill-none group-hover:text-emerald-400" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M16.972 6.251a2 2 0 0 0-2.72.777l-3.713 6.682l-2.125-2.125a2 2 0 1 0-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 0 0 1.471-1.009l5-9a2 2 0 0 0-.776-2.72" />
</svg>

      `;
  completedBtn.classList.add(
    "complete-btn",
    "group",
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
      if (todoList.children.length === 0) {
        emptyTask.classList.remove("hidden");
      }
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
  
  if (todos.length === 0) {
    emptyTask.classList.remove("hidden");
  } else {
    emptyTask.classList.add("hidden");
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add(
      "flex",
      "justify-between",
      "bg-slate-100/30",
      "text-black",
      "items-center",
      "transition-all",
      "duration-300",
      "ease-in-out",
      "rounded-sm",
    );

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item", "flex-1", "p-4", "text-white");
    todoDiv.appendChild(newTodo);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none group-hover:text-rose-400" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-6.287 10.713Q11 16.425 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288M7 6v13z" />
</svg>

    `;
    trashBtn.classList.add(
      "trash-btn",
      "group",
      ...todoItemBtnStyles.split(" "),
    );
    todoDiv.appendChild(trashBtn);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none fill-none group-hover:text-emerald-400" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M16.972 6.251a2 2 0 0 0-2.72.777l-3.713 6.682l-2.125-2.125a2 2 0 1 0-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 0 0 1.471-1.009l5-9a2 2 0 0 0-.776-2.72" />
</svg>

      `;
    completedBtn.classList.add(
      "complete-btn",
      "group",
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

