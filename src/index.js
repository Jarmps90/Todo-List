// import { removeTodo } from './objects.js';



const modal = (function() {
  const container = document.querySelector('#container');

  // class DomElementCreate {
  //   constructor(id, type) {
  //     this.type = type;
  //     this.id = id;

  //   };



  //   get labelElemnts() {
  //     const labelEl = document.createElement('label');
  //     const inputEl = document.createElement('input');

  //     labelEl.htmlFor = this.id;
  //     inputEl.id = this.id

  //     return labelEl
  //   };


  // };
  function InputElements(type, id) {

  };

  function LabelElements(labelFor) {
    const el = document.createElement('label');
    el.htmlFor = labelFor;

    return container.appendChild(el);
  };


  const modalCreate = () => {
    let labelElement = new DomElementCreate('title');


    container.appendChild(labelElement.labelElemnts)



  };

  const createTodoBtn = () => {
    const addBtn = document.createElement('button');

    addBtn.classList.add('addBtn');
    addBtn.textContent = 'Add';
    container.appendChild(addBtn);

    addBtn.addEventListener('click', () => {
      modalCreate();

    });
  };

  return {modalCreate, createTodoBtn}
})();



function domControll() {

};

function userInput() {

};



const runButton = modal.createTodoBtn();
