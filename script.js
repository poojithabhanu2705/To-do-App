const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-Input');
const todoListUL = document.getElementById('task');
const filterTodo = document.getElementById('filterTodo');

let allTodos = getTodos();
let currentFilter = "all";

filterTodo.addEventListener('change', () => {
  currentFilter = filterTodo.value;
  updateTodoList();
});

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";

  let filteredTodos = allTodos;

  if (currentFilter === "completed") {
    filteredTodos = allTodos.filter(todo => todo.completed);
  } else if (currentFilter === "pending") {
    filteredTodos = allTodos.filter(todo => !todo.completed);
  }

  filteredTodos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "task";

  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label class="custom-checkbox" for="${todoId}">
      <i class="fa-solid fa-check" fill="transparent"></i>
    </label>
    <label for="${todoId}" class="todo-text">
      ${todo.text}
    </label>
    <button class="delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  const deleteButton = todoLI.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });

  checkbox.checked = todo.completed;

  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function getTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

updateTodoList();