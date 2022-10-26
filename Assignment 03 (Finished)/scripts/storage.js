'use strict'


// Save userArr to local storage
const saveToStorage = function (arr) {
    localStorage.setItem("userArr", JSON.stringify(arr))
}

// Temporary save user data to session storage
const tempSave = function (arr) {
    sessionStorage.setItem("tempUser", JSON.stringify(arr))
}

// Get tempUser array from senssion storage
const getTempSave = function () {
    tempUser = JSON.parse(sessionStorage.getItem("tempUser"))
    return tempUser
}

// Load userArr from local storage
const getFromStorage = function () {
    userArr = JSON.parse(localStorage.getItem("userArr"))
    return userArr
}

// Save todo list to local storage
const saveTodo = function (arr) {
    localStorage.setItem(`${tempUser[0].username + 'todoArr'}`, JSON.stringify(arr))
}

// Get todo list from local storage
const getTodo = function () {
    todoArr = JSON.parse(localStorage.getItem(`${tempUser[0].username + 'todoArr'}`))
    return todoArr
}

// Temporary save user setting to sessison storage
const saveTempSetting = function (arr) {
    sessionStorage.setItem("tempSettings", JSON.stringify(arr))
}

// Get tempUser array from sessison storage
const getTempSetting = function () {
    tempSettings = JSON.parse(sessionStorage.getItem("tempSettings"))
    return tempSettings
}

