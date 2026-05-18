// العناصر
const input = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const toggleBtn = document.getElementById("toggleMode");

// Dark Mode
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("mode", document.body.classList.contains("dark") ? "dark" : "light");
});

// المهام
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // نص المهمة
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        if (task.done) taskSpan.classList.add("done");
        taskSpan.addEventListener("click", () => toggleDone(index));
        li.appendChild(taskSpan);

        // التاريخ
        if (task.date) {
            const dateSpan = document.createElement("small");
            dateSpan.textContent = `📅 ${task.date}`;
            dateSpan.classList.add("task-date");
            li.appendChild(dateSpan);
        }

        // زر الحذف
        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.addEventListener("click", () => deleteTask(index));
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

function addTask() {
    if (!input.value) return;
    tasks.push({ text: input.value, date: dateInput.value, done: false });
    input.value = "";
    dateInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// زر الإضافة
addBtn.addEventListener("click", addTask);

// رندر أولي
renderTasks();
