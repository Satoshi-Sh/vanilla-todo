// get elemetns

const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

// dealing with local storage
const addLocalStorage = (todo) => {
  const myTodo = JSON.parse(localStorage.getItem("myTodo"))
    ? JSON.parse(localStorage.getItem("myTodo"))
    : [];
  myTodo.push(todo);
  localStorage.setItem("myTodo", JSON.stringify(myTodo));
};

const removeLocalStorage = (id) => {
  const myTodo = JSON.parse(localStorage.getItem("myTodo"));
  filtered = myTodo.filter((todo) => todo.id !== id);
  localStorage.setItem("myTodo", JSON.stringify(filtered));
};

const updateLocalStorage = (id) => {
  const myTodo = JSON.parse(localStorage.getItem("myTodo"));
  const index = myTodo.findIndex((todo) => {
    return todo.id === id;
  });

  console.log(index);
  if (index != -1) {
    console.log("working?");
    myTodo[index].status = !myTodo[index].status;
  }
  localStorage.setItem("myTodo", JSON.stringify(myTodo));
};

//make element with addtodo
{
  /* <div class="todo">
<input type="checkbox" /><span>Walk a Dog</span><span>Delete</span>
</div> */
}

const removeTodo = (e) => {
  const todo = e.target.parentNode;
  console.log(todo.id);
  removeLocalStorage(todo.id);
  todo.remove();
};
const checkBox = (e) => {
  const id = e.target.parentNode.id;
  console.log(id);
  updateLocalStorage(id);
  const todoTitle = e.target.nextSibling;
  if (todoTitle.classList.contains("crossed")) {
    todoTitle.classList.remove("crossed");
  } else {
    todoTitle.classList.add("crossed");
  }
};
const addTodo = (todo, isNew = true) => {
  if (todo.title === "") return;
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo";
  todoDiv.id = todo.id;
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("change", (e) => {
    checkBox(e);
  });
  if (todo.status) {
    checkbox.checked = true;
  }
  todoDiv.append(checkbox);
  const span = document.createElement("span");
  span.textContent = todo.title;
  if (todo.status) {
    span.classList.add("crossed");
  }
  todoDiv.append(span);
  const span2 = document.createElement("span");
  span2.innerText = "🗑️";
  span2.addEventListener("click", removeTodo);
  todoDiv.append(span2);

  todoList.append(todoDiv);
  if (isNew) {
    addLocalStorage(todo);
  }
  todoInput.value = "";
};

// add trigger
addButton.addEventListener("click", () => {
  const id = crypto.randomUUID();
  const todo = { title: todoInput.value, status: false, id };
  addTodo(todo);
});

// start array with localstorage or an empty array

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("myTodo")) {
    myTodo = JSON.parse(localStorage.getItem("myTodo"));
  } else {
    myTodo = [];
  }

  for (let todo of myTodo) {
    console.log(todo);
    addTodo(todo, false);
  }
});
