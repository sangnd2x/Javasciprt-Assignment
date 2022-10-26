'use strict'

// Create user class
class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.username = username,
        this.password = password
    }
}

// New user
let newUser = {}

// Get user array from local storage
let userArr = []

// Turn object from localstorage to instance 
function parseUser(userData) {
    const user = new User(userData.firstName, userData.lastName, userData.username, userData.password)

    return user
}

// User after parsed by parseUser function
let userCl = {}

// Array of users parsed by parseUser function
let userClArr = []

// Get tempUser array from local storage
let tempUser = []

// Create Task class
class Task {
    constructor(task, owner, isDone) {
        this.task = task,
        this.owner = owner,
        this.isDone = isDone
    }
}

// Todo Array
let todoArr = []

// Temporary settings
let tempSettings = []



