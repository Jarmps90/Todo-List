import { removeTodo } from './objects.js';



function modal() {
  const container = document.querySelector('#container');

  const addBtn = document.createElement('button');
  addBtn.classList.add('addBtn');
  addBtn.textContent = 'Add'
  container.appendChild(addBtn);

  addBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    container.appendChild(modal);
  });




};

function domControll() {

};

function userInput() {

};


modal();
