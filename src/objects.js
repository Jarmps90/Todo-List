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


  const projectControl = (projectName) => {
    getProjects();
    const project = CreateProject(projectName);

    projetArray.push(project);
    localStorage.setItem('Projects', JSON.stringify(projetArray));

  };
// Mabye todo fuction takes in some positonon???
// and mabye that positon gomes in from submit fuction???
  const todoControl = (projectName,title, description, duedate, priority) => {
    const todo = CreateTodos(title, description, duedate, priority)

    projectName.push(todo);
    return todo;
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
