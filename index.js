let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ''} class="custom-checkbox">
        <label for="${task.id}"">${task.text}</label>
        <img src="data:image/png;base64,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" alt="del" class="delete" data-id="${task.id}"">

    `;

    taskList.append(li);
}

function renderList(){
    taskList.innerHTML = '';
    tasks.forEach(addTaskToDOM);
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId){
    const task = tasks.filter((task) => task.id === taskId);

    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        // showNotification('toggle done');
        return;
    }
    showNotification('something went wrong');
}

function deleteTask(taskId){
    const newTasks = tasks.filter((task) => task.id !== taskId);
    tasks = newTasks;
    renderList();
    // showNotification('task deleted successfully');
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        // showNotification('task added successfully');
        return;
    }
    showNotification('task cannot be added');
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        
        if(!text){
            showNotification('Task text cannot be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value = '';
        addTask(task);
    }
}
function handleClickListener(e){
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
    }
}
function intiialize(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

intiialize();
