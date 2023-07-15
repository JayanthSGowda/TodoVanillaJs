let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ''} class="custom-checkbox">
        <label for="${task.id}"">${task.text}</label>
        <img src="https://github.com/JayanthSGowda/TodoVanillaJs/blob/main/images/bin.png" alt="del" class="delete" data-id="${task.id}"">

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
