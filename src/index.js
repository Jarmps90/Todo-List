import { removeTodo } from './objects.js';



const modal = (function() {
  const container = document.querySelector('#container');

  const modalCreate = () => {
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    const titleLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const dueDateInput = document.createElement('input')
    const dueDateLabel = document.createElement('label');
    const priorityInput = document.createElement('input');
    const priorityLabel = document.createElement('label');

    form.setAttribute('method', 'post');
    dialog.classList.add('modal');

    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title:';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');

    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('id', 'description');

    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Date';
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('id', 'dueDate');

    dialog.appendChild(form);
    container.appendChild(dialog);

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);

    dialog.showModal();
  };

  const createTodoBtn = () => {
    const addBtn = document.createElement('button');

    addBtn.classList.add('addBtn');
    addBtn.textContent = 'Add';
    container.appendChild(addBtn);

    addBtn.addEventListener('click', () => {
      modalCreate()

    });
  };

  return {modalCreate, createTodoBtn}
})();



function domControll() {

};

function userInput() {

};

const runButton = modal.createTodoBtn();
