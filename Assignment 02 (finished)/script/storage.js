'use strict'

// Save petArr to local storage
const saveToStorage = function (arr) {
    localStorage.setItem("petArr", JSON.stringify(arr))
}

// Load petArr from local storage
const getFromStorage = function () {
    petArr = JSON.parse(localStorage.getItem("petArr"))
    return petArr
}

// Save breedList to local storage
const saveToStorageBreed = function (arr) {
    localStorage.setItem("breedList", JSON.stringify(arr))
}

// Load breedList from local storage
const getFromStorageBreed = function () {
    breedList = JSON.parse(localStorage.getItem("breedList"))
    return breedList
}

