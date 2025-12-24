// import { removeTodo } from './objects.js';



const modal = (function() {
  const container = document.querySelector('#container');

  const modalCreate = () => {


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
