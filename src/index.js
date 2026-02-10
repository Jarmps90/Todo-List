import { objectControl } from './objects.js';
import { modal } from './modal.js'
import './style.css';


modal.createProjectBtn();
modal.createTodoBtn();

const navBar = (function () {
  const container = document.querySelector('#container');
  const navBar = document.createElement('nav');

  navBar.classList.add('projec-bar');
  container.appendChild(navBar);
}());

const objects = objectControl();

function updateDisplay() {
  let key = Object.keys(localStorage)

  if (localStorage.getItem(key) !== null) {
    projectDisplay();
  } else {
    console.log('Storage is empty');
  };
};

function todoDisplay() {
    const container = document.querySelector('#container');

    // const todo = todoControl();
    const todoArray = todo.getTodoArray();
    container.innerHTML = "";

    for (let i = 0; i < todoArray.length; i++) {
        const todoCard = document.createElement('div');
        todoCard.id = 'todoCard';

        const title = document.createElement('p');
        const description = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');

        title.innerText = `Title: ${todoArray[i].title}`;
        description.innerText = `Description: ${todoArray[i].description}`;
        dueDate.innerText = `Due Date: ${todoArray[i].dueDate}`;
        priority.innerText = `Priority: ${todoArray[i].priority}`;

        todoCard.appendChild(title);
        todoCard.appendChild(description);
        todoCard.appendChild(dueDate);
        todoCard.appendChild(priority);

        container.appendChild(todoCard);
      };
};

function projectDisplay() {
  const navBar = document.querySelector('nav');
  const projectArray = objects.getProjects();
  let count = 0;
  navBar.innerHTML = "";

  projectArray.forEach((element) => {
      const objectDiv = document.createElement('div');

      objectDiv.textContent = element.projectName;
      objectDiv.id = count++;
      navBar.appendChild(objectDiv);
    });

};



export function userInput() {
  const container = document.querySelector('#container');

  const submit = () => {

    container.addEventListener('click', function addTodo(event) {
      if (event.target.id === 'submitBtn') {
        const dialog = document.querySelector('dialog');
        const todoTitle = document.getElementById('title').value;
        const todoDescription = document.getElementById('description').value;
        const todoDueDate = document.getElementById('dueDate').value;
        const todoPriority = document.getElementById('priority-select').value;

        objects.todoControl(todoTitle, todoDescription, todoDueDate, todoPriority);
        event.preventDefault();
        dialog.close();
        container.removeEventListener('click', addTodo);
      };
    });
  };

  const projectSubmit = () => {
    container.addEventListener('click',  function addProject(event) {

      container.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
         const dialog = document.querySelector('dialog');
         dialog.close();
         container.removeEventListener('click', addProject)
         };
      });

      if (event.target.id === 'projectSubmitBtn') {
        const dialog = document.querySelector('dialog');
        const prjectName = document.getElementById('project').value;

        objects.projectControl(prjectName);
        projectDisplay();
        event.preventDefault();
        dialog.close();
        container.removeEventListener('click', addProject);
      };
    });
  };
  return { submit, projectSubmit };
};

updateDisplay();
