import { Task } from "./modules/tasks.js";
import { Project } from "./modules/projects.js";
import { AppState } from "./modules/appState.js";
import { loadProjects } from "./modules/storage.js";
import { renderTasks, renderProjects } from "./modules/render.js"
import { setupProjectListeners, setupAddProjectListerner, setupAddTaskListener, deleteTaskListener, editTaskListener, deleteProjectListener } from "./ui/events.js";


window.app = new AppState;

//const newProject1 = new Project("Direct");

//const newTask1 = new Task(
//"manual title",
//  "manual description",
// "manual tomorrow",
//  "manual high",
// false
//)



//newProject1.addTask(newTask1);
//app.addProject(newProject1);

//console.log(app)

renderProjects(app)
setupProjectListeners(app);
setupAddProjectListerner(app);
setupAddTaskListener(app);
deleteTaskListener(app)
editTaskListener(app)
deleteProjectListener(app)
