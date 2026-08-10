// Click events for projectElements
import { renderProjects, renderTasks } from "../modules/render.js";
import { Project } from "../modules/projects.js";
import { Task } from "../modules/tasks.js";
import { createTaskElement } from "./dom.js";
import { AppState } from "../modules/appState.js";
import { savedProjects, loadProjects } from "../modules/storage.js";


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

        savedProjects(app.projects);

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
        editingTaskId = "";
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
            savedProjects(app.projects)
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


let editingProjectId = null;

export function editProjectListener(app) {
    const projectList = document.querySelector("#project-list")
    const editProjectDialog = document.querySelector("#edit-project-dialog");
    const editProjectForm = document.querySelector("#edit-project-form")
    const editProjectName = document.querySelector("#edit-project-name");
    const closeEditProjectForm = document.querySelector("#cancel-edit-project")



    projectList.addEventListener("click", (event) => {
        const editButton = event.target.closest(".edit-project-item")

        if (!editButton) return;

        const projectItem = editButton.closest(".project-item");

        const projectId = projectItem.dataset.id;


        const project = app.projects.find(project => project.id === projectId);


        editingProjectId = projectId;

        editProjectName.value = project.name;

        editProjectDialog.showModal()

    });

    editProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedProjectName = editProjectName.value.trim();
        if (!updatedProjectName) return;

        app.editProject(editingProjectId, updatedProjectName);

        renderProjects(app);

        editProjectForm.reset();
        editProjectDialog.close();

        editingProjectId = null;
    });

    closeEditProjectForm.addEventListener("click", (event) => {
        editProjectForm.reset()
        editProjectDialog.close()

        editingProjectId = null;
    })
}


export function toggleTaskListener(app) {
    const taskList = document.querySelector("#task-list");

    taskList.addEventListener("change", (event) => {
        if (!event.target.matches(".task-completed")) return;

        const taskCard = event.target.closest(".task-card");
        const taskId = taskCard.dataset.id

        const task = app.currentProject.tasks.find(task => task.id === taskId)

        task.toggleComplete();
        renderTasks(app)


    })
}