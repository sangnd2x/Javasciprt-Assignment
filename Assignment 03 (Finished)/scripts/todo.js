'use strict'

// Get elements
const taskInput = document.getElementById('input-task')
const addBtn = document.getElementById('btn-add')
const todoList = document.getElementById('todo-list')
const closeBtn = document.getElementsByClassName('close')
const checked = document.querySelector('.checked')

// Get tempUser to see who is logging in
if (getTempSave() == null) {
    tempUser = []
} else {
    tempUser = getTempSave()
}



// Get todo list of this user from local storage
if (getTodo() == null) {
    todoArr = []
} else {
    todoArr = getTodo()
}

let user = parseUser(tempUser[0])

// If user is logged in, show todo list of this user
if (tempUser.length > 0) {
    renderList(todoArr)  
}

// Add todo items
addBtn.addEventListener('click', function () {
    // Get username of logged in user
    let username = user.username

    // Create instance of todo item and add to todoArr
    let todoItem = new Task(taskInput.value, username, false)
    todoArr.push(todoItem)
    
    // Save todo list to local storage and render it
    saveTodo(todoArr)
    renderList(todoArr)
})

// Render todo list
function renderList(arr) {
    todoList.innerHTML = ''
    for (let i = 0; i < arr.length; i++){
        let item
        arr[i].isDone == false ? item = `<li>${arr[i].task}<span class="close">×</span></li>` : item = `<li class="checked">${arr[i].task}<span class="close">×</span></li>`
        todoList.insertAdjacentHTML('afterbegin', item)
    }
  
}

let closeBtnArr = Array.from(closeBtn)

// Delete todo item
todoList.addEventListener('click', function (e) {
    
    let text 
    let index
    
    if (e.target.classList.contains('close')) {
        // Get text of todo item
        for (let i = 0; i < closeBtnArr.length; i++) {
            text = e.target.parentElement.textContent.slice(0, -1)  
        }
       
        // Find that item in todoArr
        index = todoArr.findIndex(item => item.task == text)
      
        // Delete that item, update todoArr and render again
        todoArr.splice(index, 1)
        // saveTodo(todoArr)
        renderList(todoArr) 
    
    // Mark item as completed when clicked
    } else {
        // Get text of clicked item
        text = e.target.textContent.slice(0, -1)

        // Find that item in todoArr
        index = todoArr.findIndex(item => item.task == text)

        // Toggle isDone
        todoArr[index].isDone == false ? todoArr[index].isDone = true : todoArr[index].isDone = false

        // update todoArr and render again
        saveTodo(todoArr)  
        renderList(todoArr)
    } 
})



