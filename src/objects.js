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
  let projetArray = [];
  let projects = [];

  const projectControl = (projectName) => {
    const project = CreateProject(projectName);

    projects.push(project);
    localStorage.setItem('Projects', JSON.stringify(projects));
  };

  const todoControl = (title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority)
    //Look into exercise repo.

  };

  const getProjects = () => {
    let keys = Object.keys(localStorage);

    keys.forEach((key) => {
      projetArray = JSON.parse(localStorage.getItem(key));
    });

    return projetArray;
  };

  return { projectControl, todoControl, getProjects };
};
