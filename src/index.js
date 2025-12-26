// import { removeTodo } from './objects.js';



const modal = (function() {
  const container = document.querySelector('#container');
  const dialog = document.createElement('dialog');
  const form = document.createElement('form');

  function InputElements(type, id, name) {
    const el = document.createElement('input');
    el.type = type;
    el.id = id;
    el.name = name;

    return container.appendChild(el);
  };


  function LabelElements(labelFor, text) {
    const el = document.createElement('label');
    el.htmlFor = labelFor;
    el.textContent = text;

    return container.appendChild(el);
  };


  const modalCreate = () => {
    const titleLabel = LabelElements('title', 'Title:')
    const titleInput = InputElements('text', 'title', 'title');
    const textLabel = LabelElements('description', 'Desctioption:');
    const textInput = InputElements('text', 'description', 'description');
  };

  const createTodoBtn = () => {
    const addBtn = document.createElement('button');

    addBtn.classList.add('addBtn');
    addBtn.textContent = 'Add';
    container.appendChild(addBtn);

    addBtn.addEventListener('click', () => {


    });
  };

  return {modalCreate, createTodoBtn}
})();



function domControll() {

};

function userInput() {

};



const runButton = modal.createTodoBtn();
