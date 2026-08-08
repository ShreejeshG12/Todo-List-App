import { Project } from "./projects.js";
import { loadProjects } from "./storage.js";

// Appstate will store projects, give current project, initialize a default project if no saved projects exist

// It will also have methods to add project as well as remove project

export class AppState {
    constructor() {
        this.projects = [];
        this.currentProject = null;

        this.initialize();
    }


    initialize() {
        const savedProjects = loadProjects();

        if (savedProjects.length === 0) {
            const defaultProject = new Project("Default");
            this.projects.push(defaultProject);
            this.currentProject = this.projects[0];
        }
        else {
            this.projects = savedProjects;
            this.currentProject = this.projects[0]
        }
    };

    // add project

    addProject(project) {
        this.projects.push(project);
    }


    // removing project logic. It also handles case where if a removed projected is selected project
    // , it selects 1st one on project or returns null if no projects remain


    removeProject(projectId) {
        // this returns a new array with project matching the projectId removed
        this.projects = this.projects.filter(project => project.id !== projectId);

        if (this.currentProject?.id === projectId) {
            this.currentProject = this.projects[0] || null;
        }
    }

    editProject(projectId, updatedProjectName) {
        this.projects = this.projects.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    name: updatedProjectName
                }
            }
            return project
        })
    }

}

