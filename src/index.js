import { objectControl } from "./objects.js";
import { modal } from "./modal.js";
import "./style.css";


const contanerControl = (function () {
  const container = document.querySelector("#container");

  const navBar = (function() {
    const navBar = document.createElement("nav");
    navBar.classList.add("projec-bar");
    container.appendChild(navBar);
    })();


  function todoContainer() {
    const todoContainer = document.createElement('div');

    todoContainer.classList.add('todoDiv');
    container.appendChild(todoContainer);
  };

  function toolBarForButtons() {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-bar');
    container.appendChild(buttonDiv);
   };
  todoContainer(), toolBarForButtons();
  modal.createProjectBtn();
  modal.createTodoBtn();
})();

const dpControl = displayControl();
const objects = objectControl();

export function projectId() {
  const navBar = document.querySelector("nav");
  let projectId = 0;

  navBar.addEventListener("click", (event) => {
    projectId = event.target.id;
    objects.getTodos();
    todoChecker();
  });

  const getProjectId = () => projectId;

  return { getProjectId };
};

function updateDisplay() {
  let key = Object.keys(localStorage);

  if (localStorage.getItem(key) !== null) {
    dpControl.projectDisplay();
  } else {
    console.log("Storage is empty");
  };
};


function todoChecker() {
  const todos = objects.getTodos();
  const todoDiv = document.querySelector(".todoDiv");
  todoDiv.innerHTML = "";

  todos.forEach((todo) => {
    if(todo.expanded === true) {
      dpControl.todoDisplay(todo);
    } if(todo.expanded === false) {
      dpControl.todoDisplaySmall(todo);
    };
      
  });
  modal.editButton();
  modal.todoRemovBtn();
  modal.toggleButton();
  modal.expandButton();
};



function displayControl() {

  const todoDisplay = (todo) => {
    const container = document.querySelector("#container");
    const todoDiv = document.querySelector('.todoDiv');
    const todoCard = document.createElement('div');
  
      const title = document.createElement("div");
      const description = document.createElement("p");
      const dueDate = document.createElement("p");
      const priority = document.createElement("p");
  
      todoCard.classList.add("todoCard");
      todoCard.classList.add("expanded");
      title.classList.add('todo-title');
      title.innerText = `Title: ${todo.title}`;
      description.innerText = `Description: ${todo.description}`;
      dueDate.innerText = `Due Date: ${todo.dueDate}`;
      priority.innerText = `Priority: ${todo.priority}`;
  
      todoCard.appendChild(title);
      todoCard.appendChild(description);
      todoCard.appendChild(dueDate);
      todoCard.appendChild(priority);
      todoDiv.appendChild(todoCard);
      container.appendChild(todoDiv);
  };
  
  
  const todoDisplaySmall = (todo) => {
    const container = document.querySelector("#container");
    const todoDiv = document.querySelector('.todoDiv');
    
      const todoCard = document.createElement("div");
      const title = document.createElement("p");

      todoCard.classList.add("todoCard");
      title.classList.add('todo-title');
      title.innerText = `${todo.title}`;
  
      todoCard.appendChild(title);
      todoDiv.appendChild(todoCard);
      container.appendChild(todoDiv);
  };
  
  const projectDisplay = () => {
    const navBar = document.querySelector("nav");
    const projectArray = objects.getProjects();
    let count = 0;
    navBar.innerHTML = "";
  
    projectArray.forEach((element) => {
      const objectDiv = document.createElement("div");
  
      objectDiv.textContent = element.projectName;
      objectDiv.id = count++;
      navBar.appendChild(objectDiv);
    });
  };

 
  return { todoDisplay, todoDisplaySmall, projectDisplay };

};

export function userInput() {
  const container = document.querySelector("#container");

  const submit = () => {
    container.addEventListener("click", function addTodo(event) {
      if (event.target.id === "submitBtn") {
        const dialog = document.querySelector("#todoModal");
        const todoTitle = document.getElementById("title").value;
        const todoDescription = document.getElementById("description").value;
        const todoDueDate = document.getElementById("dueDate").value;
        const todoPriority = document.getElementById("priority-select").value;

        objects.todoControl(
          todoTitle,
          todoDescription,
          todoDueDate,
          todoPriority,
        );
	todoChecker();
        event.preventDefault();
        dialog.close();
        dialog.remove();
        container.removeEventListener("click", addTodo);
      };
    });
  };

  const projectSubmit = () => {
    container.addEventListener("click", function addProject(event) {
      container.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          const dialog = document.querySelector("dialog");
          dialog.close();
          dialog.remove();
          container.removeEventListener("click", addProject);
        };
      });

      if (event.target.id === "projectSubmitBtn") {
        const dialog = document.querySelector("#projectModalDialog");
        const prjectName = document.getElementById("project").value;

        objects.projectControl(prjectName);
        dpControl.projectDisplay();
        event.preventDefault();
        dialog.close();
        dialog.remove();
        container.removeEventListener("click", addProject);
      };
    });
  };

  const toggleDoneBtn = (event) => {
    const todoCards = document.querySelectorAll('.todoCard'); 
    const todos = objects.getTodos();

    todoCards.forEach((todoCards, index) => {
     todoCards.dataset.id = todos[index].id
    });

    const todoCard = event.target.parentElement;
    const cardId = todoCard.getAttribute('data-id');
    const todoIndex = todos.findIndex((todo) => todo.id === cardId); 

    objects.completeMethod(todos[todoIndex], todoIndex); 
  };

  const expandBtn = (event) => {
    const todoCards = document.querySelectorAll('.todoCard'); 
    const todos = objects.getTodos();

    todoCards.forEach((todoCards, index) => {
     todoCards.dataset.id = todos[index].id
    });

    const todoCard = event.target.parentElement;
    const cardId = todoCard.getAttribute('data-id');
    const todoIndex = todos.findIndex((todo) => todo.id === cardId); 

    objects.expandMethod(todos[todoIndex], todoIndex); 
    todoChecker();
  };

  const todoRemovBtn = (event) => {
    const todoCards = document.querySelectorAll('.todoCard'); 
    const todos = objects.getTodos();

    todoCards.forEach((todoCards, index) => {
      todoCards.dataset.id = todos[index].id
    });
    const todoCard = event.target.parentElement;
    const cardId = todoCard.getAttribute('data-id');
    const todoIndex = todos.findIndex((todo) => todo.id === cardId);

    if(todoIndex !== -1) {
      todoCard.remove();
      todos.splice(todoIndex, 1); 
    };
    objects.updateLocalStroage();
   };

  const getInputValues = () => {
    const todos = objects.getTodos()
    const title = todos[0].title
    
    document.getElementById('title').value = title; 
    document.getElementById('description').value = 'This is test todo'; 
    document.getElementById('dueDate').value = '2026-04-14'; 
    document.getElementById('priority-select').value = 'low'; 
  };



  return { submit, projectSubmit, toggleDoneBtn, todoRemovBtn, expandBtn, getInputValues  };
};


updateDisplay()
