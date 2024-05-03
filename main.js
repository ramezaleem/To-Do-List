let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")

// Add Empety Array 
let arraysOfTasks = []
    // Check If There Is Tasks
if (localStorage.getItem("tasks")) {
    arraysOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
// Check Button Delete
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteWith(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done")
    }
})

// Trigger Data From Local Storage 
getDataFromLocalStorage()
    // Access on Submit 
submit.onclick = function() {
    if (input.value != "") {
        addTaskToArray(input.value)
        input.value = ""
    }
}

// Function Add Task To Array 
function addTaskToArray(taskText) {
    // Add Task
    const task = {
            id: Date.now(),
            title: taskText,
            completed: false,
        }
        // Add Task To Array
    arraysOfTasks.push(task)
        // Add Elements To Page
    addElementsToPage(arraysOfTasks)
        // Add Data To LocaStorage
    addDataToLocalStorage(arraysOfTasks)
}

// Looping On Arrays Of Tasks

function addElementsToPage(arraysOfTasks) {
    // Empty Tasks 
    tasksDiv.innerHTML = ""

    // Access On Every Adding Task
    arraysOfTasks.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
            // check If Task Completed
        if (task.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))


        // Create Btn Deleted
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Deleted"))
        div.appendChild(span)
            // Append Task In Page
        tasksDiv.appendChild(div)
    });
}

// Add Data To LocaStorage

function addDataToLocalStorage(arraysOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arraysOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addElementsToPage(tasks)
    }
}

function deleteWith(tasksId) {
    for (let i = 0; i < arraysOfTasks.length; i++) {
        arraysOfTasks = arraysOfTasks.filter((task) => task.id != tasksId)
        addDataToLocalStorage(arraysOfTasks)
    }
}