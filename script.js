document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const priorityInput = document.getElementById("priorityInput");

    if (taskInput.value.trim() === "") return alert("Please enter a task!");

    const taskObj = {
        id: Date.now(),
        text: taskInput.value,
        date: dateInput.value || "No Deadline",
        priority: priorityInput.value,
        completed: false
    };

    renderTask(taskObj);
    saveTask(taskObj);
    
    taskInput.value = "";
    dateInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");
    li.classList.add(`p-${task.priority}`);
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
        <div class="task-top">
            <span onclick="toggleTask(${task.id})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">✕</button>
        </div>
        <div class="task-details">
            <span>📅 Deadline: ${task.date}</span>
            <span>🚩 Priority: ${task.priority}</span>
        </div>
    `;
    document.getElementById("taskList").prepend(li);
}

function toggleTask(id) {
    let tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload(); // UI refresh
}

function deleteTask(id) {
    let tasks = getTasks().filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const element = document.querySelector(`[data-id="${id}"]`);
    element.style.opacity = "0";
    setTimeout(() => element.remove(), 300);
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function loadTasks() {
    getTasks().forEach(renderTask);
}