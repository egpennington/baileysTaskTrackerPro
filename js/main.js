// firebase database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://bailystasktrackerpro-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const tasksInDB = ref(database, "tasks")

const addBtn = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const taskList = document.querySelector(".task-list")

// update database instantly
onValue(tasksInDB, function(snapshot) {

    if (snapshot.exists()) {        
        let tasksArray = Object.entries(snapshot.val())

        clearTasksListLIs()
    
        for (let i = 0; i < tasksArray.length; i++) {
            let currentTask = tasksArray[i]
    
            let currentTaskID = currentTask[0]
            let currentTaskValue = currentTask[1]
    
            addItemToTaskList(currentTask)
        }
    } else {
        taskList.innerHTML = "...No task here yet..."
    }    
})

addBtn.addEventListener("click", () => {
    let inputValue = inputField.value
    push(tasksInDB, inputField.value)
    clearInputField()
})

function clearInputField() {
    inputField.value = ""
}

function clearTasksListLIs() {
    taskList.innerHTML = ""
}

function addItemToTaskList(task) {
    // taskList.innerHTML += `<li>${taskValue}</li>`
    let taskID = task[0]
    let taskValue = task[1]

    let newEl = document.createElement("li")
    newEl.textContent = taskValue

    newEl.addEventListener("dblclick", ()=> {
        let exactLocationOfTaskInDB = ref(database, `tasks/${taskID}`)
        remove(exactLocationOfTaskInDB)

     })

    taskList.append(newEl)
}


// function toggleTaskDoneClass() {
//     element.classList.toggle("task-done");
// }

// taskList.addEventListener("click", () => {
//     ul.classList.toggle("task-done")

// })

// 우유