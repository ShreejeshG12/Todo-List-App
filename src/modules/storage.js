import { Task } from "./tasks.js"
import { Project } from "./projects.js";
import { AppState } from "./appState.js";

export function savedProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}





export function loadProjects() {
    const savedProjects = localStorage.getItem("projects");


    if (!savedProjects) {
        return [];
    }

    const projects = JSON.parse(savedProjects);


    const loadedProjects = projects.map(projectData => {
        const project = new Project(projectData.name);

        project.id = projectData.id;

        project.tasks = projectData.tasks.map(taskData => {
            const task = new Task(
                taskData.title,
                taskData.description,
                taskData.dueDate,
                taskData.priority
            );

            task.id = taskData.id
            task.complete = taskData.complete;


            return task;
        })

        return project;
    })

    return loadedProjects;
}