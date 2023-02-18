const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");
addButton = document.querySelector(".add-btn");
totalTask = document.querySelector(".task-count p");
let todos = JSON.parse(localStorage.getItem("todo-list")); //getting local storage todo-list
localStorage.setItem("total-task", todos.length);
filters = document.querySelectorAll(".filters span");
localStorage.setItem("btn-id", "all");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    localStorage.setItem("btn-id", btn.id);
    showTodo(btn.id);
  });
});

// function which shows todo list
function showTodo(filter) {
  let li = "";
  let totalTaskCount = localStorage.getItem("total-task");
  if (todos) {
    todos.forEach((todo, id) => {
      // if todo status is completed , set the isCompleted to checked
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `
      <li class="task">
                  <label for="${id}">
                      <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                      <p class="${isCompleted}">${todo.name}</p>
                  </label>
                  <div class="settings">
                      <img onclick="deleteTask(${id})" class="delete-icon" src="assets/delete.png" alt="delete-button">
                  </div>
              </li>
      `;
      }
    });
  }
  taskBox.innerHTML = li || `<p>You don't have any task here</p>`;
  totalTask.innerHTML = `Total Tasks : ${totalTaskCount}`;
}
showTodo(localStorage.getItem("btn-id"));

//function for delete all tasks
function deleteAllTask() {
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  localStorage.setItem("total-task", todos.length);
  showTodo(localStorage.getItem("btn-id"));
}

//function for delete particular task
function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  localStorage.setItem("total-task", todos.length);
  showTodo(localStorage.getItem("btn-id"));
}

//function for update task status
function updateStatus(selectedTask) {
  //getting paragraph that contains task name
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the selected task to completed
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    // updating the selected task to pending
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

//takes input and added in todos array and local storage
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!todos) {
      // if todos isn't exist, pass an empty array to todos
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo); //adding new task to todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    localStorage.setItem("total-task", todos.length);
    document.querySelector("#all").classList.add("active");
    document.querySelector("#completed").classList.remove("active");
    document.querySelector("#pending").classList.remove("active");
    showTodo("all");
  }
});
