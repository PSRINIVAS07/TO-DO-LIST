const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const searchDate = document.getElementById("searchDate");
const searchBtn = document.getElementById("searchBtn");
const tabs = document.querySelectorAll(".tab");
const todoList = document.getElementById("todoList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTab = "all";
addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    const dueDate = taskDate.value;

    if (taskName) {
        tasks.push({ name: taskName, date: dueDate, completed: false });
        taskInput.value = "";
        taskDate.value = "";
        renderTasks();
    }
});
function renderTasks(filterDate = null) {
    todoList.innerHTML = "";
    tasks
        .filter((task) => {
            if (currentTab === "completed") return task.completed;
            if (currentTab === "pending") return !task.completed;
            return true;
        })
        .filter((task) => (filterDate ? task.date === filterDate : true))
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `todo-item ${task.completed ? "completed" : ""}`;
            li.innerHTML = `
                <span>${task.name} <small>(${task.date || "No Date"})</small></span>
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    saveTasks();
}
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");
        currentTab = tab.dataset.tab;
        renderTasks();
    });
});

searchBtn.addEventListener("click", () => {
    renderTasks(searchDate.value);
});
renderTasks();
