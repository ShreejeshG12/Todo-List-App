// Click events for projectElements
import { renderProjects, renderTasks } from "../modules/render.js";
import { Project } from "../modules/projects.js";
import { Task } from "../modules/tasks.js";


// function to display the task lists and options inside the current project

export function setupProjectListeners(app) {
    const projectList = document.querySelector("#project-list");

    projectList.addEventListener("click", (event) => {
        const projectElement = event.target.closest(".project-item");


        if (!projectElement) return;

        const projectId = projectElement.dataset.id;

        const selectedProject = app.projects.find(project => project.id === projectId);

        app.currentProject = selectedProject;

        renderTasks(app);
    })
};


export function setupAddProjectListerner(app) {
    const addProjectButton = document.querySelector(".add-project");
    const addProjectName = document.querySelector("#project-name-input");

    addProjectButton.addEventListener("click", () => {
        const projectName = addProjectName.value.trim();

        if (!projectName) return;

        const newProject = new Project(projectName);

        app.addProject(newProject);

        renderProjects(app);

        // Note , using textcontent below does not remove the previous value for project name
        addProjectName.value = "";
    })
}


export function setupAddTaskListener(app) {
    const addTaskButton = document.querySelector(".add-task");
    const taskDialog = document.querySelector("#task-dialog");
    const taskForm = document.querySelector("#task-form")
    const closeForm = document.querySelector("#close-form")

    addTaskButton.addEventListener("click", () => {
        taskDialog.showModal();
    })


    closeForm.addEventListener("click", (event) => {
        event.preventDefault();


        const title = document.querySelector("#task-title");
        const description = document.querySelector("#task-description");
        const dueDate = document.querySelector("#task-date");
        const priority = document.querySelector("#task-priority");


        const newTask = new Task(title.value, description.value, dueDate.value, priority.value, false);

        app.currentProject.addTask(newTask);

        renderTasks(app)

        taskForm.reset();

        taskDialog.close();





    })




}
