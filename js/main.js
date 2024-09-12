//** Call variables
let inputText = document.querySelector('input');
let addButton = document.querySelector('.add-button');
let todoHtml = document.querySelector('.todos');
let error = document.getElementById('error');
let todoJson = JSON.parse(localStorage.getItem("todos")) || [];
displayTodo();

function addTodoHtml(todo) {
//* Input * It will be learned if the status of the task is “completed”
//* span * If the task is complete, the “Completed” class will be placed on it so that a line appears on it
  return `
  <li class="todo">
    <input type="checkbox" class="task-check" ${todo.status === "completed" ? "checked" : ""}>
    <span class="taskname ${todo.status === "completed" ? "completed" : ""}">${todo.name}</span>
    <button class="edit-btn">
    <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="delete-btn">
    <i class="fa-solid fa-trash"></i>
    </button>
  </li>`;
}

function displayTodo() {
  //* If there are no tasks. empty the place where the tasks are supposed to be displayed
  if (todoJson.length == 0) {
    todoHtml.innerHTML = '';
  } else {
  //*If there are tasks. use (map) to convert each task to HTML using the (addTodoHtml) function...
    todoHtml.innerHTML = todoJson.map(addTodoHtml).join('');
  }

//* This links the delete button to tasks
  addEventListenerList()
//* This connects the checkbox so that we know if the task is completed or not yet
  checkedLisen()
}

function addTask(todo)  {

  //* Here the first time you add a new task, Clear the input box
  inputText.value = "";

  //* Add the new task to the beginning of the array
  todoJson.unshift({ name: todo, status: "pending" });

  //* update the localStorage and display the tasks
  localStorage.setItem("todos", JSON.stringify(todoJson));
  
  displayTodo();
}

//* Press the button.. task will be added
addButton.addEventListener("click", () => {
  let todo = inputText.value.trim();
  error.style.display = "none";
  if (!todo) {
    //* Display error if an empty value 
      setTimeout( () =>{
        error.style.display = "block";
      },200);
    return;
  }
  addTask(todo);
});

function checkedLisen() {
  //* checkbox is linked to its own task
  let checkBox = document.querySelectorAll('.task-check');
  checkBox.forEach((check, index)=>{
    check.onchange = () => {
        check.nextElementSibling.classList.toggle("completed");

      //* When you step on a checkbox, its state in the array changes between "completed" and "pending"
        if (check.checked) {
          todoJson[index].status = "completed";
        } else {
          todoJson[index].status = "pending";
        }
  
      //* update the localStorage and display the tasks
      localStorage.setItem("todos", JSON.stringify(todoJson));
    }
  });
}

function remove(todo) {

  //* Here we get the index value for the task you want to delete
  const index = todo.dataset.index;

  // delete the text from the Array //! Use Splice to remove the old task...
  //! And the number 1 means “delete one item” starting from the index we got.
  todoJson.splice(index, 1);

  //* update the localStorage and display the tasks
  localStorage.setItem("todos", JSON.stringify(todoJson));

  displayTodo();
}

//* Each delete button is associated with a specific task
function addEventListenerList() {
  let deleteAll = document.querySelectorAll('.delete-btn');
  deleteAll.forEach((button, index) => {

    // When you click on the delete button. //! we remove the task from the array using splice based on the index.
    button.onclick = () => {
    todoJson.splice(index, 1);
    
    //* Again update the localStorage and display the tasks
    localStorage.setItem("todos", JSON.stringify(todoJson));

    displayTodo();
  };
});

//* Editing Code
let editAll = document.querySelectorAll('.edit-btn');
editAll.forEach((editBtn, index) => {
editBtn.onclick = (e) => {
  let targetElement = e.target;

  //* If you press the icon inside a button
  if (!(targetElement.className == "edit-btn")) {
    targetElement = targetElement.parentElement;
  }

  //* the text in the input field to edit it
  let taskElement = targetElement.previousElementSibling;
  inputText.value = taskElement.innerText;

  // delete the text from the Array //! Use Splice to remove the old task
  todoJson.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoJson));
  displayTodo();
};
});
}