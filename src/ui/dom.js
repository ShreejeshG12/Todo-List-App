// creating DOM events for our task and projects



export function createTaskElement(task) {

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");


    taskCard.dataset.id = task.id;


    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due Date: ${task.dueDate}`;

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${task.priority}`;


    // making check boxes and buttons
    const completedCard = document.createElement("label");

    const completedCheckBox = document.createElement("input")
    completedCheckBox.type = "checkbox";
    completedCheckBox.checked = task.complete;

    const statusText = document.createElement("span");

    if (task.complete) {
        statusText.textContent = "Completed"
    } else {
        statusText.textContent = "Not Completed"
    };

    completedCard.append(completedCheckBox, statusText);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";


    taskCard.append(
        title, description, dueDate, priority, completedCard, editButton, deleteButton
    );
    return taskCard;
}


export function createProjectElement(project) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-item");
    projectContainer.dataset.id = project.id;

    const projectName = document.createElement("span");
    projectName.textContent = project.name;

    projectContainer.append(projectName);

    return projectContainer;

}