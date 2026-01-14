function CreateProject(name) {
  const project = {
    projectName: name,
    todos: []
  };
  return project;
};


function CreateTodos(title, description, dueDate, priority) {
  const newTodo = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority
  }
  return newTodo;
};



export function todoControl() {
  let todoArray = [];
  let keys = Object.keys(localStorage);

  const createTodo = (title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority)

    localStorage.setItem(title, JSON.stringify(todo));
    console.log(todoArray)
  };

  keys.forEach((key) => {
    todoArray.push(JSON.parse(localStorage.getItem(key)));
  });

  const getTodoArray = () => todoArray;

  return {getTodoArray, createTodo};
};
