// firebase database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// variables
const appSettings = {
    databaseURL: "https://bailystasktrackerpro-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const tasksInDB = ref(database, "tasks")

const addBtn = document.getElementById("add-button")
const deleteBtn = document.getElementById("delete-button")
const inputField = document.getElementById("input-field")
const taskList = document.getElementById("task-list")
const errorMsg = document.getElementById("error-msg")

// update database instantly from firebase
onValue(tasksInDB, function(snapshot) {

    if (snapshot.exists()) {        
        let tasksArray = Object.entries(snapshot.val()).reverse()

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

// event listeners, where the magic happens
// addBtn.addEventListener("click", () => {
//     let inputValue = inputField.value
//     push(tasksInDB, inputField.value)
//     clearInputField()
// })

addBtn.addEventListener("click", () => {
    let inputValue = inputField.value

    if(inputValue.trim() === "") {        
        console.log("Please enter a task")
        errorMsg.innerText = "Enter a task"
        errorMsg.classList.remove("error")
        errorMsg.classList.add("errorDisplay")
        
        setTimeout(() => {
            errorMsg.textContent = ""
            errorMsg.classList.add("error")
            
        }, 2000)
        
    } else {
        // errorMsg.textContent = ""       

        push(tasksInDB, inputField.value)
        clearInputField()        
    }     
})

// functions
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

    deleteBtn.addEventListener("dblclick", ()=> {
        let exactLocationOfTaskInDB = ref(database, `tasks/${taskID}`)
        remove(exactLocationOfTaskInDB)

     })

    taskList.append(newEl)
}

taskList.addEventListener("click", function(event) {
    
    if (event.target.tagName === "LI") {
       
        event.target.classList.toggle("task-done");
    }
})

document.querySelector(".menu-btn").addEventListener("click", function() {
   document.querySelector(".main-menu").classList.toggle("show")
})

// 우유
