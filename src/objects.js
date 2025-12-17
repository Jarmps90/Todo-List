
class Todo {
  constructor(title, description, duedate, priority) {
    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
  };
};


const newTodo = new Todo('test', 'test text that does not matter', '12.12.2046', 'High');

let todoToLocalStorage = JSON.stringify(newTodo);

localStorage.setItem('todo', todoToLocalStorage);

let todoFromLocalStorage = JSON.parse(localStorage.getItem('todo'));

console.log(todoFromLocalStorage);
