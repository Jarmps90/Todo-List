import { removeTodo } from './objects.js';



const modal = (function() {
  const container = document.querySelector('#container');

  const modalCreate = () => {
    const dialog = document.createElement('dialog');

    dialog.classList.add('modal');
    container.appendChild(dialog);
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
});



function domControll() {

};

function userInput() {

};


modal();
