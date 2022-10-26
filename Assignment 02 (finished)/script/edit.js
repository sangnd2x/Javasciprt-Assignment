'use strict'
const tableBodyEl = document.getElementById('tbody')
const inputForm = document.getElementById('container-form')
const submitBtn = document.getElementById('submit-btn')
const inputId = document.getElementById('input-id')
const inputName = document.getElementById('input-name')
const inputAge = document.getElementById('input-age')
const inputType = document.getElementById('input-type')
const inputWeight = document.getElementById('input-weight')
const inputLength = document.getElementById('input-length')
const inputColor = document.getElementById('input-color-1')
const inputBreed = document.getElementById('input-breed')
const inputVaccinated = document.getElementById('input-vaccinated')
const inputDewormed = document.getElementById('input-dewormed')
const inputSterilized = document.getElementById('input-sterilized')

// Pet array stores all pets data
let petArr = []


// Render table from local storage
// Get petArr from local storage
if (getFromStorage() == null) {
    petArr = []
} else {
    petArr = getFromStorage()
}

// breedList
let breedList = []

if ((getFromStorageBreed() == null)) {
    breedList = []
} else {
    breedList = getFromStorageBreed()
}

// Render petArr to page
renderTableData(petArr)

// Edit pet
tableBodyEl.addEventListener('click', function (e) {

    // If edit btn is not clicked, stop the function
    if (e.target.id != 'btn-edit') return

    // Get pet ID when clicking the button
    const petId = e.target.getAttribute('data-id')

    let idPet = petArr.findIndex(pet => pet.id === petId)

    // If there's no pet ID, stop the function
    if (!petId) return

    inputForm.classList.remove('hide')

    console.log(petArr[idPet])

    inputId.value = petArr[idPet].id
    inputName.value = petArr[idPet].name
    inputAge.value = petArr[idPet].age
    inputWeight.value = petArr[idPet].weight
    inputLength.value = petArr[idPet].dlength
    inputColor.value = petArr[idPet].color
    inputType.value = petArr[idPet].type
    updateBreed(inputType.value)
    inputBreed.value = petArr[idPet].breed
    inputVaccinated.checked = petArr[idPet].vaccinated
    inputDewormed.checked = petArr[idPet].dewormed
    inputSterilized.checked = petArr[idPet].sterilized
})


// Show breed options
inputType.addEventListener('change', function (e) {
    // Clear breed options in breed input
    inputBreed.innerHTML = ''

    // Add options to breed input based on type selected
    if (inputType.value != 'Select Type') {
        let filtered = []
        // Iterate through breedList to push object has dog or cat type to filtered array
        for (let i = 0; i < breedList.length; i++) {

            let breed = breedList[i]
            let value = Object.values(breed).indexOf(inputType.value)

            // If object has inputType.value (either dog or cat), indexOf will return 1
            if (value > -1) {
                filtered.push(breed)
            }
        }

        // Render option to breed input
        for (let j = 0; j < filtered.length; j++) {
            const option = document.createElement('option')
            option.innerHTML = `<option>${filtered[j].name}</option>
            `
            inputBreed.appendChild(option)
        }
    }
})


// submit event
submitBtn.addEventListener('click', function () {
    let idPet = petArr.findIndex(pet => pet.id === inputId.value)
    // Input validation
    // Check to see if every field is filled
    if (inputId.value == '') return alert('ID must be filled')

    if (inputName.value == '') return alert('Name must be filled')
    if (inputAge.value == '') return alert('Age must be filled')
    if (inputWeight.value == '') return alert('Weight must be filled')
    if (inputLength.value == '') return alert('Length must be filled')


    // Other inputs validation
    // Check if age is between 1 and 15
    if (inputAge.value >= 1 && inputAge.value <= 15) {
        // Check if weight is between 1 and 15
        if (inputWeight.value >= 1 && inputWeight.value <= 15) {
            // Check if length is between 1 and 100
            if (inputLength.value >= 1 && inputLength.value <= 100) {
                // Check if type is selected
                if (inputType.value !== 'Select Type' && inputType.value !== null) {
                    // Check if breed is selected
                    if (inputBreed.value !== 'Select Breed' && inputBreed.value !== null) {
                        petArr[idPet].name = inputName.value
                        petArr[idPet].age = inputAge.value
                        petArr[idPet].type = inputType.value
                        petArr[idPet].weight = inputWeight.value
                        petArr[idPet].dlength = inputLength.value
                        petArr[idPet].name = inputName.value
                        petArr[idPet].color = inputColor.value
                        petArr[idPet].breed = inputBreed.value
                        petArr[idPet].vaccinated = inputVaccinated.checked
                        petArr[idPet].dewormed = inputDewormed.checked
                        petArr[idPet].sterilized = inputSterilized.checked
                        saveToStorage(petArr)
                        renderTableData(petArr)
                    } else {
                        alert('Please select Breed!')
                    }
                } else {
                    alert('Please select Type!')
                }
            } else {
                alert('Length must be between 1 and 100!')
            }
        } else {
            alert('Weight must be between 1 and 15!')
        }
    } else {
        alert('Age must between 1 and 15!')
    }
})


// Render function
function renderTableData(petArr) {

    tableBodyEl.innerHTML = ''

    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement('tr')

        // Green sign if these are true, red if false
        let sterilized = petArr[i].sterilized ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'
        let dewormed = petArr[i].dewormed ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'
        let vaccinated = petArr[i].vaccinated ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>'

        // Add data to row
        row.innerHTML = `
            <th scope="row">P00${petArr[i].id}</th> 
            <td> ${petArr[i].name} </td> 
            <td> ${petArr[i].age}</td>
            <td> ${petArr[i].type} </td>
            <td> ${petArr[i].weight} kg</td>
            <td> ${petArr[i].dlength} cm</td>
            <td> ${petArr[i].breed} </td>
            <td> <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i> </td>
            <td> ${vaccinated} </td>
            <td> ${dewormed} </td>
            <td> ${sterilized} </td>
            <td> ${petArr[i].date} </td>
            <td><button data-id="${petArr[i].id}" type="button" class="btn btn-warning" id="btn-edit">Edit</button></td>			
            `

        tableBodyEl.appendChild(row)
    }
}


// Update breed function
const updateBreed = function (petType) {
    // Clear breed options in breed input
    inputBreed.innerHTML = ''

    // Array of breed after user select type (cat or dog)
    let filtered = []

    // Add options to breed input based on type selected
    if (petType != 'Select Type') {

        // Iterate through breedList to push object has dog or cat type to filtered array
        for (let i = 0; i < breedList.length; i++) {

            let breed = breedList[i]
            let value = Object.values(breed).indexOf(petType)

            // If object has inputType.value (either dog or cat), indexOf will return 1
            if (value > -1) {
                filtered.push(breed)
            }
        }

        // Render option to breed input
        for (let j = 0; j < filtered.length; j++) {
            const option = document.createElement('option')
            option.innerHTML = `<option>${filtered[j].name}</option>
            `
            inputBreed.appendChild(option)
        }
    }
}


