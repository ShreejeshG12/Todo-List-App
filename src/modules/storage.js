export function savedProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}





export function loadProjects() {
    const savedProjects = localStorage.getItem("projects");


    if (!savedProjects) {
        return [];
    }

    return JSON.parse(savedProjects);
}