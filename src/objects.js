import { projectId } from "./index.js";

function CreateProject(name) {
  const project = {
    projectName: name,
    todos: [],
  };
  return project;
}

function CreateTodos(title, description, dueDate, priority) {
  const newTodo = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
  };
  return newTodo;
}

export function objectControl() {
  let projetArray = [];
  const projectID = projectId();

  const getTodoArray = () => {
    const id = projectID.getPrjectId();
    const todoArray = [];

    let myNewArray = projetArray.map(consoe.log(id));
    return myNewArray;
  };

  const projectControl = (projectName) => {
    getProjects();
    const project = CreateProject(projectName);

    projetArray.push(project);
    localStorage.setItem("Projects", JSON.stringify(projetArray));
  };

  const todoControl = (title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority);
    const id = projectID.getPrjectId();
    getProjects();
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

  return { projectControl, todoControl, getProjects, getTodoArray };
}
