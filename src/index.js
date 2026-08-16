import { objectControl } from "./objects.js";
import { modal } from "./modal.js";
import "./style.css";


const contanerControl = (function () {
  const container = document.querySelector("#container");
  const mainBody = document.createElement("div");

  mainBody.id = 'main-body';
  container.append(mainBody);

  const navBar = (function() {
    const navBar = document.createElement('nav');
    const projects = document.createElement('div');
    const heading = document.createElement('h2');


    heading.textContent = 'Projects';
    projects.classList.add('projects');
    navBar.classList.add('projec-bar');
    navBar.appendChild(heading);
    navBar.appendChild(projects);
    container.appendChild(navBar);
    modal.createProjectBtn();
    })();


  const todoContainer = () => {
    const todoContainer = document.createElement('div');

    todoContainer.classList.add('todoDiv');
    mainBody.appendChild(todoContainer);
  };

  function toolBarForButtons() {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-bar');
    container.appendChild(buttonDiv);
   };
  toolBarForButtons();
  modal.createTodoBtn();
  return { todoContainer };
})();

const dpControl = displayControl();
const objects = objectControl();
const containerControl = contanerControl;


function updateDisplay() {
  let key = Object.keys(localStorage);

  if (localStorage.getItem(key) !== null) {
    dpControl.projectDisplay();
  } else {
    console.log("Storage is empty");
  };
};

export function projectId() {
 const projects = document.querySelector(".projects");
  let projectId = 0;

  projects.addEventListener("click", (event) => {
    projectId = event.target.id;
    if(event.target.id) {
      document.querySelector('.active')?.classList.remove('active');
      document.getElementById(event.target.id).classList.add('active'); 
    } else {
      document.querySelector('.active')?.classList.remove('active');
    };
    todoChecker();

  });

  const getProjectId = () => projectId;

  return { getProjectId };
};

function todoChecker() {
  const todos = objects.getTodos();
  containerControl.todoContainer();
  const todoDiv = document.querySelector(".todoDiv");
  const mainBody = document.querySelector("#main-body");
  mainBody.innerHTML = "";
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
  const mainBody = document.querySelector("#main-body");
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todoDiv");

  const todoDisplay = (todo) => {
    const todoCard = document.createElement('div');
    
  
      const title = document.createElement("div");
      const description = document.createElement("p");
      const dueDate = document.createElement("p");
      const priority = document.createElement("p");
  
      todoCard.classList.add("todoCard");
      todoCard.classList.add("expanded");
      title.classList.add('todo-title');
      description.classList.add('todo-description');
      dueDate.classList.add('todo-duedate');
      priority.classList.add('todo-priority');
      title.innerText = `Title: ${todo.title}`;
      description.innerText = `Description: ${todo.description}`;
      dueDate.innerText = `Due Date: ${todo.dueDate}`;
      priority.innerText = `Priority: ${todo.priority}`;
  
      todoCard.appendChild(title);
      todoCard.appendChild(description);
      todoCard.appendChild(dueDate);
      todoCard.appendChild(priority);
      todoDiv.appendChild(todoCard);
      mainBody.appendChild(todoDiv);
  };
  
  
  const todoDisplaySmall = (todo) => {
    
      const todoCard = document.createElement("div");
      const title = document.createElement("p");

      todoCard.classList.add("todoCard");
      title.classList.add('todo-title');
      title.innerText = `${todo.title}`;
  
      todoCard.appendChild(title);
      todoDiv.appendChild(todoCard);
      mainBody.appendChild(todoDiv);
  };
  
  const projectDisplay = () => {
    const navBar = document.querySelector(".projects");
    const projectArray = objects.getProjects();
    let count = 0;
    navBar.innerHTML = "";
  
    projectArray.forEach((element) => {
      const objectDiv = document.createElement("div");
      objectDiv.classList.add('project');
  
      objectDiv.textContent = element.projectName;
      objectDiv.id = count++;
      navBar.appendChild(objectDiv);
    });
    modal.projectRemoveBtn();
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

  const todoModalClose = () => {
    container.addEventListener('click', function close(event) {
      const dialog = document.querySelector('#todoModal');
      container.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
         dialog.close();
       	 dialog.remove();
       	 container.removeEventListener('click', close);
        };
      });
      if(event.target.id === 'close-button') {
        dialog.close();
        dialog.remove();
        container.removeEventListener('click', close);
      };
    });
  };

  const projectButtons = () => {
    container.addEventListener("click", function project(event) {
      const dialog = document.querySelector("#projectModalDialog");
      
      container.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          dialog.close();
          dialog.remove();
          container.removeEventListener("click", project);
        }  
      });

      if (event.target.id === "projectSubmitBtn") {
        const prjectName = document.getElementById("project").value;

        objects.projectControl(prjectName);
        dpControl.projectDisplay();
        event.preventDefault();
        dialog.close();
        dialog.remove();
        container.removeEventListener("click", project);

      } else if(event.target.id === 'close-button') {
	dialog.close();
	dialog.remove();
        container.removeEventListener("click", project);
      };
    });
  };

  const update = (index) => {
    const todos = objects.getTodos();
    const todo = todos[index];
    container.addEventListener("click", function updateTodo(event) {
      if (event.target.id === "updateBtn") {
        const dialog = document.querySelector("#todoModal");
        const todoTitle = document.getElementById("title").value;
        const todoDescription = document.getElementById("description").value;
        const todoDueDate = document.getElementById("dueDate").value;
        const todoPriority = document.getElementById("priority-select").value;

        objects.updateTodos(index, todoTitle, todoDescription, todoDueDate, todoPriority, todo.completed, todo.expanded, todo.id);

	todoChecker();
        event.preventDefault();
        dialog.close();
        dialog.remove();
        container.removeEventListener("click", updateTodo);
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
    todoChecker();
    objects.updateLocalStroage();
   };

  const projectRemoveBtn = (event) => {
    const projectDivs = document.querySelectorAll('.project');
    const projects = objects.getProjects();
    
    projectDivs.forEach((projectDivs, index) => {
      projectDivs.dataset.id = projects[index].id 
          });
    const projectDiv = event.target.parentElement;
    const divId = projectDiv.getAttribute('data-id');
    
    const projectIndex = projects.findIndex((project) => project.id === divId);

    if(projectIndex !== -1) {
      projectDiv.remove();
      projects.splice(projectIndex, 1);
    };
    objects.updateLocalStroage();
  };

  const getTodoIndex  = (event) => {
    const todoCards = document.querySelectorAll('.todoCard'); 
    const todos = objects.getTodos();

    todoCards.forEach((todoCards, index) => {
     todoCards.dataset.id = todos[index].id
    });

    const todoCard = event.target.parentElement;
    const cardId = todoCard.getAttribute('data-id');
    const todoIndex = todos.findIndex((todo) => todo.id === cardId); 
      
    return todoIndex;
  };

  const getInputValues = (id) => {
    const todos = objects.getTodos()
    const title = todos[id].title
    const description = todos[id].description
    const dueDate = todos[id].dueDate
    const priority = todos[id].priority
    
    document.getElementById('title').value = title; 
    document.getElementById('description').value = description; 
    document.getElementById('dueDate').value = dueDate; 
    document.getElementById('priority-select').value = priority; 
  };



  return { submit, projectButtons, update, toggleDoneBtn, todoRemovBtn, expandBtn, getInputValues, getTodoIndex, projectRemoveBtn, todoModalClose };
};


updateDisplay()
