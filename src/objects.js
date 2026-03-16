import { projectId } from "./index.js";

function CreateProject(name) {
  const project = {
    projectName: name,
    todos: [],
  };
  return project;
};


function CreateTodos(title, description, dueDate, priority, completed, id) {
  const newTodo = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false,
    id: self.crypto.randomUUID()
  };
  return newTodo;
};




export function objectControl() {
  let projetArray = [];
  const projectID = projectId();

  const helperFunc = (todoArr) => {
    console.log(todoArr);
    // todoArr.forEach((todo) => {
    // const todos = CreateTodos(todoArr[todo].title, todoArr[todo].description);
    // });
    // // const todos = CreateTodos(todoArr[0].title, todoArr[0].description);
    // console.log(todos)
  };
  const getTodos = () => {
    const id = projectID.getProjectId();
    let todoArray = [];

    if (id === '') {
      console.log('No projects selected');
    } else {
      todoArray = projetArray[id].todos;
      // console.log(todoArray);
      helperFunc(todoArray);
    };
    return todoArray;
  };

  const projectControl = (projectName) => {
    getProjects();
    const project = CreateProject(projectName);

    projetArray.push(project);
    localStorage.setItem("Projects", JSON.stringify(projetArray));
  };


  const todoControl = (title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority);
    const id = projectID.getProjectId();

    projetArray[id].todos.push(todo);

    localStorage.setItem("Projects", JSON.stringify(projetArray));
  };


  const getProjects = () => {
    let keys = Object.keys(localStorage);

    keys.forEach((key) => {
      projetArray = JSON.parse(localStorage.getItem(key));
    });

    return projetArray;
  };

  return { projectControl, todoControl, getProjects, getTodos };
};

const todoToggle = () => {
  CreateTodos.prototype.completed = function () {
    if (this.completed === false) {
      return this.completed = true;
    } else {
      return this.completed = false;
    }
  };
};
