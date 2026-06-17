const inputBox = document.getElementById("input");
    const listContainer = document.getElementById("list");
    function addTask() {
    if (inputBox.value === '') {
        showError("Please add a task!");
    } else {
        hideError();
        let li = document.createElement("li");

        let taskSpan = document.createElement("span");
        taskSpan.className = "task-text";
        taskSpan.textContent = inputBox.value;

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            editTask(li, taskSpan, editBtn);
        });

        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = "\u00d7";

        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteSpan);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    storeData();
}

inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

    listContainer.addEventListener("click",function(e){
if(e.target.tagName==="LI"){
    e.target.classList.toggle("checked");
    storeData();
}else if (e.target.classList.contains("task-text")) {  // 👈 added this
        e.target.closest("li").classList.toggle("checked");
        storeData();
    } 
else if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
    storeData();
}
    },false);

    function storeData(){
        localStorage.setItem("data",listContainer.innerHTML);
    }
    function displayTasks(){
        listContainer.innerHTML=localStorage.getItem("data");
    }
    displayTasks();
    function showError(message) {
    const el = document.getElementById("error-msg");
    el.textContent = message;
    el.style.display = "block";
}

function hideError() {
    const el = document.getElementById("error-msg");
    el.textContent = "";
    el.style.display = "none";
}
function clearAll() {
    if (listContainer.querySelectorAll("li").length === 0) return;
    if (confirm("Clear all tasks?")) {
        listContainer.innerHTML = "";
        storeData();
    }
}
function editTask(li, taskSpan, editBtn) {

    // ── Save mode ─────────────────────────────────────────
    if (editBtn.textContent === "Save") {
        const newText = li.querySelector(".edit-input").value.trim();

        if (newText === "") {
            showError("Task cannot be empty!");
            return;
        }

        taskSpan.textContent = newText;
        li.querySelector(".edit-input").remove();
        taskSpan.style.display = "";
        editBtn.textContent = "Edit";
        hideError();
        storeData();
        return;
    }

    // ── Edit mode ─────────────────────────────────────────
    taskSpan.style.display = "none";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = taskSpan.textContent;

    li.insertBefore(editInput, editBtn);
    editBtn.textContent = "Save";
    editInput.focus();
}