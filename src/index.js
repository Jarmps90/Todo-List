import { createTodo, todoControl } from './objects.js';
import './style.css';

const modal = (function() {
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


    const projectLabel = LabelElements('project', 'Project name: ');
    const projectInput = InputElements('text', 'project', 'project-input');

    container.appendChild(projectModalDialog);
    projectModalDialog.appendChild(projectLabel);
    projectModalDialog.appendChild(projectInput);
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

    submitButton.id = 'submitBtn';
    submitButton.textContent = 'Add';
    dialog.id = 'todoModal';
    form.id = 'todoForm';
    form.onsubmit = userInputFunc.submit();
    prioritySelect.id = 'priority-select';
    prioritySelect.name = 'priority';

    form.appendChild(prioritySelect);
    container.appendChild(dialog);
    dialog.appendChild(form);
    form.appendChild(submitButton);

  };
  const createProjectBtn = () => {
    const projectModalBtn = document.createElement('button');

    projectModalBtn.id = 'projectModal';
    projectModalBtn.textContent = 'Create project';
    container.appendChild(projectModalBtn);

    projectModalBtn.addEventListener('click', () => {
      dialog.innerHTML = "";
      projectModal();
      projectModalDialog.showModal();
    });
  };

  const createTodoBtn = () => {
    const addBtn = document.createElement('button');

    addBtn.classList.add('addBtn');
    addBtn.textContent = 'Add';
    container.appendChild(addBtn);

    addBtn.addEventListener('click', () => {
      form.innerHTML = "";
      modalCreate();
      dialog.showModal();
    });
  };

  return {modalCreate, createTodoBtn, createProjectBtn}
})();


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

function userInput() {
  const container = document.querySelector('#container');

  const submit = () => {

    container.addEventListener('click', (event) => {
      if (event.target.id === 'submitBtn') {

        const dialog = document.querySelector('dialog');
        const todoTitle = document.getElementById('title').value;
        const todoDescription = document.getElementById('description').value;
        const todoDueDate = document.getElementById('dueDate').value;
        const todoPriority = document.getElementById('priority-select').value;

        createTodo(todoTitle, todoDescription, todoDueDate, todoPriority);
        event.preventDefault();
        dialog.close();
        domControll();
      };
    });
  };
  return { submit };
};

domControll();
