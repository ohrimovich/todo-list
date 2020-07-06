class Tasks {
    addButton = document.querySelector('.add-button');
    input = document.querySelector('.input');
    constructor() {
        this.tasksArr = [];
        this.addTask();
        this.getToDoList();
    }

    addTask() {
        this.addButton.addEventListener('click', () => {
            const value = this.input.value.trim();
            if(value) {
                this.tasksArr.push({
                    id: this.tasksArr[this.tasksArr.length - 1].id + 1,
                    completed: false,
                    title: value
                })
                this.deleteAllTasks();
                this.renderArr();
            }
        })
    } 

    renderArr() {
        this.tasksArr.forEach(task => {
            let div = document.createElement('div');
            div.className = 'task';
            div.innerHTML = task.title;
            div.append(this.createDeleteButton(task.id));
            document.body.append(div);
            console.log(task)
        })
    }

    getToDoList() {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
         .then(response => response.json())
         .then(json => {
             this.tasksArr = json;
             console.log(this.tasksArr);
             this.deleteAllTasks();
             this.renderArr();
    })
  }
  
  deleteAllTasks() {
      [...document.querySelectorAll('.task')].forEach(task => task.remove());
  }

  createDeleteButton(taskId) {
    let button = document.createElement('button');
    button.innerHTML = 'X';
    button.addEventListener('click', () => {
        this.tasksArr = this.tasksArr.filter(task => task.id != taskId);
        this.deleteAllTasks();
        this.renderArr();
        console.log(taskId)
    })
    return button;
  }

}
let tasks = new Tasks();
