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
  let projects = [];

  const projectControl = (projectName) => {
    const project = CreateProject(projectName);

    projects.push(project);
  };

  const todoControl = (title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority)
    //Look into exercise repo.
    return { todo };
  };

  const getProjectsArray = () => projects;

  return { projectControl, todoControl, getProjectsArray };
};
