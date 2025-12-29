import { createTodo } from './objects.js';



const modal = (function() {
  const container = document.querySelector('#container');
  const dialog = document.createElement('dialog');
  const form = document.createElement('form');
  const prioritySelect = document.createElement('select');

  //To create input elements
  function InputElements(type, id, name) {
    const el = document.createElement('input');
    el.type = type;
    el.id = id;
    el.name = name;

    return form.appendChild(el);
  };

  //To create label elements
  function LabelElements(labelFor, text) {
    const el = document.createElement('label');
    el.htmlFor = labelFor;
    el.textContent = text;

    return form.appendChild(el);
  };

  //To create options for select
  function CreateSelect(value, content) {
    const el = document.createElement('option');
    el.value = value;
    el.textContent = content;

    return prioritySelect.appendChild(el);
  };


  const modalCreate = () => {

    const titleLabel = LabelElements('title', 'Title:')
    const titleInput = InputElements('text', 'title', 'title');
    const textLabel = LabelElements('description', 'Desctioption:');
    const textInput = InputElements('text', 'description', 'description');
    const dueDateLabel = LabelElements('dueDate', 'Due date:');
    const dueDateInput = InputElements('date', 'dueDate', 'dueDate');
    const priorityLabel = LabelElements('priority-select', 'Select priority:');
    const selectPriority = CreateSelect("''", 'Please choose an option');
    const lowPrioriy = CreateSelect('low', 'Low');
    const mediumPriority = CreateSelect('medium', 'Medium');
    const highPriority = CreateSelect('high', 'High');
    const submitButton = document.createElement('button');

    // submitButton.type = 'submit';
    submitButton.id = 'submitBtn';
    submitButton.textContent = 'Add';
    submitButton.onclick = submitBtn(e);
    dialog.id = 'todoModal';
    form.action = '#';
    prioritySelect.id = 'priority-select';
    prioritySelect.name = 'priority';
    form.appendChild(prioritySelect);
    container.appendChild(dialog);
    dialog.appendChild(form);
    form.appendChild(submitButton);

  };


  const createTodoBtn = () => {
    const addBtn = document.createElement('button');

    addBtn.classList.add('addBtn');
    addBtn.textContent = 'Add';
    container.appendChild(addBtn);

    addBtn.addEventListener('click', () => {

      modalCreate();
      dialog.showModal();
      submitBtn();

    });
  };

  const submitBtn = () => {
    const submitBtn = dialog.querySelector('button');
    const titleInput = document.querySelector('#title');

    const string = JSON.stringify(titleInput);
    localStorage.setItem('title', string);
    // submitBtn.addEventListener('click', () => {
    //   const string = JSON.stringify(titleInput);
    //   localStorage.setItem(string);

    // });

  };

  return {modalCreate, createTodoBtn, submitBtn}
})();



function domControll() {

};

function userInput() {

};



const runButton = modal.createTodoBtn();
