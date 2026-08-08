// Click events for projectElements
import { renderProjects, renderTasks } from "../modules/render.js";
import { Project } from "../modules/projects.js";
import { Task } from "../modules/tasks.js";
import { createTaskElement } from "./dom.js";


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

let editingTaskId = null;

export function setupAddTaskListener(app) {
    const addTaskButton = document.querySelector(".add-task");
    const taskDialog = document.querySelector("#task-dialog");
    const taskForm = document.querySelector("#task-form")
    const closeForm = document.querySelector("#close-form")

    addTaskButton.addEventListener("click", () => {
        editTaskListener = "";
        taskForm.reset();
        taskDialog.showModal();
        closeForm.textContent = "Add Task";
    })


    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();


        const title = document.querySelector("#task-title");
        const description = document.querySelector("#task-description");
        const dueDate = document.querySelector("#task-date");
        const priority = document.querySelector("#task-priority");

        if (editingTaskId) {
            app.currentProject.editTask(editingTaskId, {
                title: title.value,
                description: description.value,
                dueDate: dueDate.value,
                priority: priority.value
            });

        } else {
            const newTask = new Task(title.value, description.value, dueDate.value, priority.value, false);

            app.currentProject.addTask(newTask);
        }

        renderTasks(app)

        taskForm.reset();

        taskDialog.close();

    })
}


export function deleteTaskListener(app) {
    const taskList = document.querySelector("#task-list");

    taskList.addEventListener("submit", (event) => {
        const deleteButton = event.target.closest(".delete-task-button");
        if (!deleteButton) return;

        const taskCard = deleteButton.closest(".task-card");
        const taskId = taskCard.dataset.id;

        app.currentProject.removeTask(taskId);

        renderTasks(app)
    });
}

export function editTaskListener(app) {
    const taskList = document.querySelector("#task-list");
    const taskDialog = document.querySelector("#task-dialog");
    const closeForm = document.querySelector("#close-form")

    const titleInput = document.querySelector("#task-title")
    const descriptionInput = document.querySelector("#task-description");
    const dueDateInput = document.querySelector("#task-date");
    const priorityInput = document.querySelector("#task-priority");

    taskList.addEventListener("click", (event) => {
        const editButton = event.target.closest(".edit-task-button");
        if (!editButton) return;

        const taskCard = editButton.closest(".task-card");
        const taskId = taskCard.dataset.id

        const task = app.currentProject.tasks.find(task => task.id === taskId);


        editingTaskId = taskId;

        titleInput.value = task.title;
        descriptionInput.value = task.description;
        dueDateInput.value = task.dueDate;
        priorityInput.value = task.priority;
        closeForm.textContent = "Edit Task"




        taskDialog.showModal()
    })
}

export function deleteProjectListener(app) {
    const projectList = document.querySelector("#project-list");

    projectList.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".delete-project-button")
        if (!deleteButton) return;

        const projectItem = deleteButton.closest(".project-item")
        const projectId = projectItem.dataset.id

        app.removeProject(projectId)
        renderProjects(app)
        renderTasks(app)
    })
}

