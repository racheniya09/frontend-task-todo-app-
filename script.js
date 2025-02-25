document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.classList.add("added");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function toggleTask(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    let li = button.parentElement;
    li.classList.add("removed");
    setTimeout(() => {
        li.remove();
        saveTasks();
    }, 300);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.firstElementChild.textContent,
            completed: task.firstElementChild.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
        `;
        taskList.appendChild(li);
    });
}
