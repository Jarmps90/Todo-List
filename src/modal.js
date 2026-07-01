//Modals and button related stuff
import { userInput } from "./index.js";

export const modal = (function() {

  const container = document.querySelector('#container');
  const dialog = document.createElement('dialog');
  const projectModalDialog = document.createElement('dialog');
  const form = document.createElement('form');
  const prioritySelect = document.createElement('select');
  const userInputFunc = userInput();

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

  const projectModal = () => {

    const projectSubmitBtn = document.createElement('button');
    const projectLabel = LabelElements('project', 'Project name: ');
    const projectInput = InputElements('text', 'project', 'project-input');

    projectModalDialog.id = 'projectModalDialog';
    projectSubmitBtn.id = 'projectSubmitBtn';
    projectSubmitBtn.textContent = 'Add';
    projectModalDialog.onsubmit = userInputFunc.projectSubmit();

    container.appendChild(projectModalDialog);
    projectModalDialog.appendChild(projectLabel);
    projectModalDialog.appendChild(projectInput);
    projectModalDialog.appendChild(projectSubmitBtn);
  };

  const modalCreate = () => {

    prioritySelect.innerHTML = "";
    LabelElements('title', 'Title:')
    InputElements('text', 'title', 'title');
    LabelElements('description', 'Desctioption:');
    InputElements('text', 'description', 'description');
    LabelElements('dueDate', 'Due date:');
    InputElements('date', 'dueDate', 'dueDate');
    LabelElements('priority-select', 'Select priority:');
    CreateSelect("''", 'Please choose an option');
    CreateSelect('low', 'Low');
    CreateSelect('medium', 'Medium');
    CreateSelect('high', 'High');

    dialog.id = 'todoModal';
    form.id = 'todoForm';
    prioritySelect.id = 'priority-select';
    prioritySelect.name = 'priority';

    form.appendChild(prioritySelect);
    container.appendChild(dialog);
    dialog.appendChild(form);
  };

  const createProjectBtn = () => {
    const projectModalBtn = document.createElement('button');
    const buttonDiv = document.querySelector('.button-bar');

    projectModalBtn.id = 'projectModal';
    projectModalBtn.textContent = 'Create project';
    buttonDiv.appendChild(projectModalBtn);

    projectModalBtn.addEventListener('click', () => {
      projectModalDialog.innerHTML = "";
      projectModal();
      projectModalDialog.showModal();
    });
  };

  const createTodoBtn = () => {
    const addBtn = document.createElement('button');
    const buttonDiv = document.querySelector('.button-bar');

    addBtn.classList.add('addBtn');
    addBtn.textContent = 'Add';
    buttonDiv.appendChild(addBtn);

    addBtn.addEventListener('click', () => {
      form.innerHTML = "";
      modalCreate();
      const submitButton = document.createElement('button');
      submitButton.id = 'submitBtn';
      submitButton.textContent = 'Add';
      form.appendChild(submitButton);
      dialog.showModal();
      form.onsubmit = userInputFunc.submit();
    });
  };

  const toggleButton = () => {
    const todoCards = document.querySelectorAll('.todoCard');
       
    todoCards.forEach((card) => {
      const toggleBtn = document.createElement('div');
      toggleBtn.classList.add('toggle');
      card.appendChild(toggleBtn);
      toggleBtn.addEventListener('click', (event) => {
	toggleBtn.style.background = 'red';
	userInputFunc.toggleDoneBtn(event);	
      });
    });
  };


  const expandButton = () => {
    const title = document.querySelectorAll('.todo-title');
   
    title.forEach((el) => {
      el.addEventListener('click', (event) => {
	userInputFunc.expandBtn(event);
      });
    });
  };

  const todoRemovBtn = () => {
    const todoCards = document.querySelectorAll('.todoCard');

    todoCards.forEach((card) => {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove');
      card.appendChild(removeBtn);
      removeBtn.addEventListener('click', (event) => {
	console.log('This button works');
	userInputFunc.todoRemovBtn(event);
      });
    });
  };

  const editButton = () => {
    const todoCards = document.querySelectorAll('.todoCard');

    todoCards.forEach((card) => {
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit');
      card.appendChild(editBtn);
      editBtn.addEventListener('click', (event) => {
	form.innerHTML = "";
	modalCreate();
	dialog.showModal();
	const index = userInputFunc.getTodoIndex(event);
	userInputFunc.getInputValues(index);
	updateBtn(index);
      }); 
    });
  };

  const updateBtn = (index) => {
    const updateBtn = document.createElement('button');
    updateBtn.id = 'updateBtn';
    updateBtn.setAttribute('type', 'button');
    updateBtn.textContent = 'Update';
    form.appendChild(updateBtn);
    form.onsubmit = userInputFunc.update(index);
  };
  return { modalCreate, createTodoBtn, createProjectBtn, toggleButton, todoRemovBtn, expandButton, editButton }
})();
