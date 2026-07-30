// Task constructor and toggler

export class Task {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
};