import { createTaskElement } from "../ui/dom.js";
import { createProjectElement } from "../ui/dom.js";


// Renders tasks and projects

export function renderProjects(app) {
    const projectList = document.querySelector("#project-list");

    projectList.textContent = "";

    app.projects.forEach(project => {

        const projectElement = createProjectElement(project);
        projectList.append(projectElement);

    })
}



export function renderTasks(app) {
    const taskList = document.querySelector("#task-list");

    taskList.textContent = "";

    app.currentProject.tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.append(taskElement);
    });
}
