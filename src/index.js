import { objectControl } from './objects.js';
import { modal } from './modal.js'
import './style.css';


modal.createProjectBtn();

const objects = objectControl();

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
  const container = document.querySelector('#container');
  const navBar = document.createElement('nav');
  const projectArray = objects.getProjectsArray();
    let count = 0;

    projectArray.forEach((element) => {
      const objectDiv = document.createElement('div');

      objectDiv.textContent = element.projectName;
      objectDiv.id = count++;
      navBar.classList.add('projec-bar');
      navBar.innerHTML = "";

      navBar.appendChild(objectDiv);
      container.appendChild(navBar);
    });
  // const runButton = modal.createTodoBtn();

};




export function userInput() {
  const container = document.querySelector('#container');
  const submit = () => {

    container.addEventListener('click', (event) => {
      if (event.target.id === 'submitBtn') {

        const dialog = document.querySelector('dialog');
        const todoTitle = document.getElementById('title').value;
        const todoDescription = document.getElementById('descriptioprojectDisplayn').value;
        const todoDueDate = document.getElementById('dueDate').value;
        const todoPriority = document.getElementById('priority-select').value;
        // const todo = todoControl();
        todo.createTodo(todoTitle, todoDescription, todoDueDate, todoPriority);
        event.preventDefault();
        dialog.close();

      };
    });
  };

  const projectSubmit = () => {
    container.addEventListener('click', (event) => {
      if (event.target.id === 'projectSubmitBtn') {
        const dialog = document.querySelector('dialog');
        const prjectName = document.getElementById('project').value;
        objects.projectControl(prjectName);
        projectDisplay();
        event.preventDefault();
        dialog.close();
      };
    });
  };
  return { submit, projectSubmit };
};
