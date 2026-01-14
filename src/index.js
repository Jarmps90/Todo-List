import { todoControl } from './objects.js';
import { modal } from './modal.js'
import './style.css';




//DomControll
function domControll() {
  const container = document.querySelector('#container');

  const todo = todoControl();
  const todoArray = todo.getTodoArray();
  container.innerHTML = "";
  const runButton = modal.createTodoBtn();
  const runProjectbtn = modal.createProjectBtn();
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


export function userInput() {
  const container = document.querySelector('#container');

  const submit = () => {

    container.addEventListener('click', (event) => {
      if (event.target.id === 'submitBtn') {

        const dialog = document.querySelector('dialog');
        const todoTitle = document.getElementById('title').value;
        const todoDescription = document.getElementById('description').value;
        const todoDueDate = document.getElementById('dueDate').value;
        const todoPriority = document.getElementById('priority-select').value;

        // createTodo(todoTitle, todoDescription, todoDueDate, todoPriority);
        event.preventDefault();
        dialog.close();
        domControll();
      };
    });
  };
  return { submit };
};

domControll();
