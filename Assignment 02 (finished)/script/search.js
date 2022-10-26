'use strict'

const idInput = document.getElementById('input-id')
const nameInput = document.getElementById('input-name')
const typeInput = document.getElementById('input-type')
const breedInput = document.getElementById('input-breed')
const vaccinatedInput = document.getElementById('input-vaccinated')
const dewormedInput = document.getElementById('input-dewormed')
const sterilizedInput = document.getElementById('input-sterilized')
const findBtn = document.getElementById('find-btn')
const tableBodyEl = document.getElementById('tbody')


// Pet array stores all pets data
let petArr = []


// Get petArr from local storage
if (getFromStorage() == null) {
    petArr = []
} else {
    petArr = getFromStorage()
}

// Found pet Array
let foundPet = []

// Breeds list
let breedList = []

// Get breedList from local storage
if (getFromStorageBreed() == null) {
    breedList = []
} else {
    breedList = getFromStorageBreed()
}

// Render function
function renderTableData(pet) {

    tableBodyEl.innerHTML = ''

    for (let i = 0; i < pet.length; i++) {
        const row = document.createElement('tr')

        // Green sign if these are true, red if false
        let sterilized = pet[i].sterilized ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'
        let dewormed = pet[i].dewormed ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'
        let vaccinated = pet[i].vaccinated ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'

        // Add data to row
        row.innerHTML = `
            <th scope="row">P00${pet[i].id}</th> 
            <td> ${pet[i].name} </td> 
            <td> ${pet[i].age}</td>
            <td> ${pet[i].type} </td>
            <td> ${pet[i].weight} kg</td>
            <td> ${pet[i].dlength} cm</td>
            <td> ${pet[i].breed} </td>
            <td> <i class="bi bi-square-fill" style="color: ${pet[i].color}"></i> </td>
            <td> ${vaccinated} </td>
            <td> ${dewormed} </td>
            <td> ${sterilized} </td>
            <td> ${pet[i].date} </td>
            <td><button data-id="${pet[i].id}" type="button" class="btn btn-danger" id="btn-delete">Delete</button></td>			
            `

        tableBodyEl.appendChild(row)
    }
}

// Render breed table
function renderBreedTable(breedList) {

    for (let i = 0; i < breedList.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = `
        <option>${breedList[i].name}</option>
        `
        breedInput.appendChild(option)
    }
}

renderBreedTable(breedList)

// Find event
findBtn.addEventListener('click', function () {
    findPet()
    resetForm()
})

function findPet() {

    let id = idInput.value
    let name = nameInput.value.toLowerCase()
    let type = typeInput.value
    let breed = breedInput.value
    let vac = vaccinatedInput.checked
    let dew = dewormedInput.checked
    let ster = sterilizedInput.checked

    foundPet = petArr

    if (id) {
        foundPet = foundPet.filter(pet => pet.id == id)
    }

    if (name) {
        foundPet = foundPet.filter(pet => pet.name.indexOf(name) != -1)
    }

    if (type) {
        foundPet = foundPet.filter(pet => pet.type == type)
    }

    if (breed) {
        foundPet = foundPet.filter(pet => pet.breed == breed)
    }

    if (vac) {
        foundPet = foundPet.filter(pet => pet.vaccinated == true)
    }

    if (dew) {
        foundPet = foundPet.filter(pet => pet.dewormed == true)
    }

    if (ster) {
        foundPet = foundPet.filter(pet => pet.sterilized == true)
    }

    renderTableData(foundPet)

}

// resetForm function
function resetForm() {
    idInput.value = ''
    nameInput.value = ''
    typeInput.value = 'Select Type'
    breedInput.value = 'Select Breed'
    vaccinatedInput.checked = false
    dewormedInput.checked = false
    sterilizedInput.checked = false
}
