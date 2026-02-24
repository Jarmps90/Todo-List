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




export function projectId() {
  const navBar = document.querySelector("nav");
  let projectId = 0;

  navBar.addEventListener("click", (event) => {
    projectId = event.target.id;
    objects.getTodos();
    todoDisplay();
  });

  const getProjectId = () => projectId;

  return { getProjectId };
};

function updateDisplay() {
  let key = Object.keys(localStorage);

  if (localStorage.getItem(key) !== null) {
    projectDisplay();
  } else {
    console.log("Storage is empty");
  };
};




function todoDisplay() {
  const container = document.querySelector("#container");
  const todoDiv = document.querySelector('.todoDiv');
  const todoArray = objects.getTodos();
  todoDiv.innerHTML = "";

  for (let i = 0; i < todoArray.length; i++) {
    const todoCard = document.createElement("div");
    todoCard.id = "todoCard";

    const title = document.createElement("p");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");

    title.innerText = `Title: ${todoArray[i].title}`;
    description.innerText = `Description: ${todoArray[i].description}`;
    dueDate.innerText = `Due Date: ${todoArray[i].dueDate}`;
    priority.innerText = `Priority: ${todoArray[i].priority}`;

    todoCard.appendChild(title);
    todoCard.appendChild(description);
    todoCard.appendChild(dueDate);
    todoCard.appendChild(priority);

    todoDiv.appendChild(todoCard);
    container.appendChild(todoDiv);
  };
};




function projectDisplay() {
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
        todoDisplay();
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
  return { submit, projectSubmit };
};

const objects = objectControl();
updateDisplay()
