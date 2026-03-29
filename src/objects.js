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
  }
  isComplited() {
    this.completed = !this.completed;
  };
  //I'll use isComplited method after user is marked todo done!
};

export function objectControl() {
  let projetArray = [];
  const projectID = projectId();

  const helperFunc = (todoArr) => {
    let todoArray = []; 
    todoArr.forEach((el) => {
      const todo = new CreateTodos(el.title, el.description, el.dueDate, el.priority);
      todoArray.push(todo)
    });
    console.log(todoArray);
    return todoArray;
  };
  const getTodos = () => {
    const id = projectID.getProjectId();
    let todoArray = [];

    if (id === '') {
      console.log('No projects selected');
    } else {
      todoArray = projetArray[id].todos;
      helperFunc(todoArray);
    };
    return todoArray;
  };
  
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

  return { projectControl, todoControl, getProjects, getTodos, helperFunc };
};
