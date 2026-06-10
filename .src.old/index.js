import { objectControl } from "./objects.js";
import { modal } from "./modal.js";
import "./style.css";


const continerControl = (function () {
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

const dpControl = displayControl()

export function projectId() {
  const navBar = document.querySelector("nav");
  let projectId = 0;

  navBar.addEventListener("click", (event) => {
    projectId = event.target.id;
    objects.getTodos();
    dpControl.todoDisplaySmall();
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


function displayControl() {
  let isExpanded = false;

  const todoDisplay = (todo) => {
    const container = document.querySelector("#container");
    const todoDiv = document.querySelector('.todoDiv');
    const todoArray = todo; 
    console.log(todo);
    todoDiv.innerHTML = "";
  
      const todoCard = document.createElement("div");
      todoCard.classList.add("todoCard");
  
      const title = document.createElement("div");
      const description = document.createElement("p");
      const dueDate = document.createElement("p");
      const priority = document.createElement("p");
  
      title.classList.add('todo-title');
      title.innerText = `${todo.title}`;
      description.innerText = `Description: ${todo.description}`;
      dueDate.innerText = `Due Date: ${todo.dueDate}`;
      priority.innerText = `Priority: ${todo.priority}`;
  
      todoCard.appendChild(title);
      todoCard.appendChild(description);
      todoCard.appendChild(dueDate);
      todoCard.appendChild(priority);
      todoDiv.appendChild(todoCard);
      container.appendChild(todoDiv);

    
    modal.toggleButton();
    modal.todoRemovBtn();
  };
  
  
  const todoDisplaySmall = () => {
    const container = document.querySelector("#container");
    const todoDiv = document.querySelector('.todoDiv');
    const todoArray = objects.getTodos();
    todoDiv.innerHTML = "";
    
    for (let i = 0; i < todoArray.length; i++) {
      const todoCard = document.createElement("div");
      todoCard.classList.add("todoCard");
  
      const title = document.createElement("p");
      title.classList.add('todo-title');
      title.innerText = `${todoArray[i].title}`;
  
      todoCard.appendChild(title);
      todoDiv.appendChild(todoCard);
      container.appendChild(todoDiv);
    };
    modal.toggleButton();
    modal.todoRemovBtn();
    expander();
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

  const expander = () => {
    const title = document.querySelectorAll('.todo-title');
    const toggleClassName = (el, className) => el.classList.toggle(className);
    const todos = objects.getTodos()
    let count = 0;

    title.forEach((el) => { 
      el.addEventListener('click', () => {
	el.id = count++
	toggleClassName(el, 'expanded');	
	if(isExpanded === false) {
	  todoDisplay(todos[el.id]);
	  isExpanded = true;
	  expander();
	} else if(isExpanded === true) {
	  todoDisplaySmall();
	  isExpanded = false;
	};
      });
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
	dpControl.todoDisplay();
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
        projectDisplay();
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

    objects.classMethod(todos[todoIndex], todoIndex); 
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

  return { submit, projectSubmit, toggleDoneBtn, todoRemovBtn };
};

const objects = objectControl();

updateDisplay()
