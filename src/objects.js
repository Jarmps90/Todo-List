

export function createTodo(title, description, duedate, priority) {

  class Todo {
    constructor(title, description, duedate, priority) {
      this.title = title;
      this.description = description;
      this.duedate = duedate;
      this.priority = priority;
    };
  };

  const todoToLocalStorage = JSON.stringify(new Todo(title, description, duedate, priority));

  localStorage.setItem(title, todoToLocalStorage);

  const todoFromLocalStorage = JSON.parse(localStorage.getItem(title));

  console.log(todoFromLocalStorage);
};





function removeTodo() {

};
