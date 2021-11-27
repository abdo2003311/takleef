var add = document.getElementById('add'),
    tasks = [],
    storage = localStorage;

var displayUi = (task) => {

    task.ui = {
        fatherDiv : document.createElement('div'),
        content : document.createElement('li'),
        delete : document.createElement('button')
    };

    task.ui.content.innerText = task.taskName;
    task.ui.content.style = "flex-grow:2;text-align:center;padding:2vw";
    task.ui.delete.innerText = 'delete';

    // delete event

    task.ui.delete.onclick = () => {

        // deleting the ui

        document.getElementById(task.fatheDivId).remove();

        // deleting task Task form the array of tasks
        
        tasks.splice(tasks.indexOf(task), 1);

        // resetting the localstorage

        storage.setItem('tasks', JSON.stringify(tasks) /* converting to JSON because the local storage only takes string value */);

    }

    task.ui.fatherDiv.id = task.fatheDivId;

    // appending all of the elements to task ui father div

    task.ui.fatherDiv.appendChild(task.ui.content);
    task.ui.fatherDiv.appendChild(task.ui.delete);

    // appending father div to tasks div 

    document.getElementsByClassName('tasks')[0].appendChild(task.ui.fatherDiv);

}

// loading the ui after the browser closed then opened (via the local storage)

if (localStorage.length != 0) {

    var jsStorage = JSON.parse(localStorage.tasks);

    tasks = jsStorage;
    
    tasks.forEach(task => {
        displayUi(task);
    });
    
}

// Task Class

function Task(taskName) {

    this.taskName = taskName;
    this.fatheDivId = 'fatheDiv' + Math.random() * 1000;

    // ui

    displayUi(this);
    
    // end ui

}

// end Task class

add.addEventListener('click', (e) => {

    // preventing from reloading the page

    e.preventDefault();

    // cheking if the input is empty

    if (taskName.value.length !== 0) {

    // constructing new Task

    var task = new Task(taskName.value);

    // adding the new Task to the array of tasks

    tasks.push(task);

    // storing the new Task in the localstorage

    storage.setItem('tasks', JSON.stringify(tasks));

    }

});