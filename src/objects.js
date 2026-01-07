export function CreateProject(name) {
  const project = {
    projectName: name,
    todos: []
  };
  return project;
};

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

};

export function todoControl() {
  let todoArray = [];
  let keys = Object.keys(localStorage);

  keys.forEach((key) => {
    todoArray.push(JSON.parse(localStorage.getItem(key)));
  });

  const getTodoArray = () => todoArray;

  return {getTodoArray};
};
