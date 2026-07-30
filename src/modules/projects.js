// Class constructor for projects with adding and removing task methods

export class Project {
    constructor(name) {
        this.id = crypto.randomUUID()
        this.name = name;
        this.tasks = [];
    }

    // adding methods to add a task to project inside tasks array. This will be used with current project which we will write in a separate module

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
};



