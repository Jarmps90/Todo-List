import { projectId } from "./index.js";

function CreateProject(name) {
  const project = {
    projectName: name,
    todos: [],
  };
  return project;
};


class CreateTodos {
  constructor(title, description, dueDate, priority) {
    this.title= title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.id = self.crypto.randomUUID();
  };

 };

class UpdateTodos {
  constructor(title, description, dueDate, priority, completed, id) {
    this.title= title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.id = id;
  };
  isComplited() {
    this.completed = !this.completed;
  };
}; 

export function objectControl() {
  let projetArray = [];
  const projectID = projectId();

  const updateLocalStroage = () => {
    //It updateds todos list in local storage.
    localStorage.setItem("Projects", JSON.stringify(projetArray));
  };
 
  const classMethod = (todo, index) => {
    const newTodo = new UpdateTodos(todo.title, todo.description, todo.dueDate, todo.priority, todo.completed, todo.id); 
    const id = projectID.getProjectId();
    newTodo.isComplited();
    const todos = projetArray[id].todos

    for(let i = 0; i < todos.length; i++) {
     if(todos[i].id === newTodo.id) {
	projetArray[id].todos.splice(index, 1, newTodo);
	updateLocalStroage();
      };   
    };
  };

  const getTodos = () => {
    const id = projectID.getProjectId();
    let todoArray = [];

    if(id === '') {
      console.log('No projects selected');
    } else {
      todoArray = projetArray[id].todos;
    };
    return todoArray; };
  
  const projectControl = (projectName) => {
    getProjects();
    const project = new CreateProject(projectName);

    projetArray.push(project);
    localStorage.setItem("Projects", JSON.stringify(projetArray));
  };


  const todoControl = (title, description, duedate, priority) => {
    const todo = new CreateTodos(title, description, duedate, priority);
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

  return { projectControl, todoControl, getProjects, getTodos, classMethod, updateLocalStroage };
};
