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

export function objectControl() {

  const projectControl = (projectName) => {
    let projects = [];
    const project = CreateProject(projectName);

    projects.push(project);
    console.log(projects)
    localStorage.setItem('Projects', JSON.stringify(projects));
  };

  const todoControl = (title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority)
    //Look into exercise repo.

  };


  const getProjects = () => {
    let projetArray = [];
    let keys = Object.keys(localStorage);

    keys.forEach((key) => {
      projetArray = JSON.parse(localStorage.getItem(key));
    });

    return projetArray;
  };

  return { projectControl, todoControl, getProjects };
};
