// import { removeTodo } from './objects.js';



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
    const radioButtons = document.createElement('fieldset');
    const priorityLowInput = document.createElement('input');
    const priorityLowLabel = document.createElement('label');
    const priorityMediumInput = document.createElement('input');
    const priorityMediumLabel = document.createElement('label');
    const priorityHighInput = document.createElement('input');
    const priorityHighLabel = document.createElement('label');

    radioButtons.classList.add('priorityBtns');
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

    priorityLowLabel.setAttribute('for', 'priorityLow');
    priorityLowLabel.textContent = 'Low';
    priorityLowInput.setAttribute('type', 'radio');
    priorityLowInput.setAttribute('id', 'priorityLow');
    priorityLowInput.setAttribute('name', 'priority');
    priorityLowInput.setAttribute('value', 'low')

    priorityMediumLabel.setAttribute('for', 'priorityMedium');
    priorityMediumLabel.textContent = 'Medium';
    priorityMediumInput.setAttribute('type', 'radio');
    priorityMediumInput.setAttribute('id', 'priorityMedium');
    priorityLowInput.setAttribute('name', 'priority');
    priorityLowInput.setAttribute('value', 'medium')


    priorityHighLabel.setAttribute('for', 'priorityHigh');
    priorityHighLabel.textContent = 'High';
    priorityHighInput.setAttribute('type', 'radio');
    priorityHighInput.setAttribute('id', 'priorityHigh');
    priorityLowInput.setAttribute('name', 'priority');
    priorityLowInput.setAttribute('value', 'high')


    form.appendChild(radioButtons);
    dialog.appendChild(form);
    container.appendChild(dialog);

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    radioButtons.appendChild(priorityLowLabel);
    radioButtons.appendChild(priorityLowInput);
    radioButtons.appendChild(priorityMediumLabel);
    radioButtons.appendChild(priorityMediumInput);
    radioButtons.appendChild(priorityHighLabel);
    radioButtons.appendChild(priorityHighInput);

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

class ElementCreate {
  constructor(type) {
    const el = document.createElement(type);

  };

};

function domControll() {

};

function userInput() {

};



const runButton = modal.createTodoBtn();
