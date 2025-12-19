import { removeTodo } from './objects.js';



function modal() {
  const container = document.querySelector('#container');
  const dialog = document.createElement('dialog');
  const addBtn = document.createElement('button');

  dialog.classList.add('modal');
  addBtn.classList.add('addBtn');
  addBtn.textContent = 'Add';
  container.appendChild(addBtn);

  addBtn.addEventListener('click', () => {
    container.appendChild(dialog);
    dialog.showModal();
  });




};

function domControll() {

};

function userInput() {

};


modal();
