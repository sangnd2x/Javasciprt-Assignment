'use strict'

// Select input fields and buttons by id
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
const submitBtn = document.getElementById('submit-btn')
const tableBodyEl = document.getElementById('tbody')
const deleteBtn = document.getElementsByClassName('btn-danger')
const healthyBtn = document.getElementById('healthy-btn')
const sidebarEl = document.getElementById('sidebar')

// Get data from inputs and save to an object


// Pet array stores all pets data
let petArr = []

// Healthy pets
let healthyCheck = false

// Healthy pets array
let healthyPetArr = []

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


// Add even to submit button
submitBtn.addEventListener('click', function () {
    const data = {
        id: inputId.value,
        name: inputName.value,
        age: parseInt(inputAge.value),
        type: inputType.value,
        weight: parseInt(inputWeight.value),
        dlength: parseInt(inputLength.value),
        color: inputColor.value,
        breed: inputBreed.value,
        vaccinated: inputVaccinated.checked,
        dewormed: inputDewormed.checked,
        sterilized: inputSterilized.checked,
        date: new Date().toLocaleDateString(),
    }


    // Input validation
    // Check to see if every field is filled
    if (inputId.value == '') return alert('ID must be filled')
    if (inputName.value == '') return alert('Name must be filled')
    if (inputAge.value == '') return alert('Age must be filled')
    if (inputWeight.value == '') return alert('Weight must be filled')
    if (inputLength.value == '') return alert('Length must be filled')


    // Check to see if ID is unique
    if (petArr.length !== 0) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].id == data.id) {
                return alert('ID must be unique')
            }
        }
    }

    // Other inputs validation
    // Check if age is between 1 and 15
    if (data.age >= 1 && data.age <= 15) {
        // Check if weight is between 1 and 15
        if (data.weight >= 1 && data.weight <= 15) {
            // Check if length is between 1 and 100
            if (data.dlength >= 1 && data.dlength <= 100) {
                // Check if type is selected
                if (data.type !== 'Select Type' && data.type !== null) {
                    // Check if breed is selected
                    if (data.breed !== 'Select Breed' && data.breed !== null) {
                        petArr.push(data)
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

    resetForm()
})

// Delete pet
tableBodyEl.addEventListener('click', function (e) {
    // If delete btn is not clicked, stop the function
    if (e.target.id != 'btn-delete') return

    // Get pet ID when clicking the button
    const petId = e.target.getAttribute('data-id')
    // If there's no pet ID, stop the function
    if (!petId) return

    // Confirm delete
    const isConfirm = confirm('Are you sure?')

    // If user select no, stop the function 
    if (!isConfirm) return
    // Find the index of data is petArr which contains petId
    // console.log(petArr.findIndex(data => data.id == petId))

    // Remove said data from petArr
    petArr.splice(petArr.findIndex(data => data.id == petId), 1)

    // Rewrite petArr in local storage
    saveToStorage(petArr)

    // Render petArr again
    renderTableData(petArr)
})


// Show healthy pets
healthyBtn.addEventListener('click', function () {
    // Change value of healthyCheck everytime the healthyBtn is clicked
    healthyCheck == false ? healthyCheck = true : healthyCheck = false

    // Show healthy pets
    if (healthyCheck == true) {
        healthyBtn.innerText = 'Show all pets'

        // Pick out healthyPet and put it in healthyPetArr
        healthyPetArr = petArr.filter(data => data.vaccinated == true && data.dewormed == true && data.sterilized == true)
        renderTableData(healthyPetArr)

        //Show all pets
    } else {
        healthyBtn.innerText = 'Show healthy pets'
        renderTableData(petArr)
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
            <td><button data-id="${petArr[i].id}" type="button" class="btn btn-danger" id="btn-delete">Delete</button></td>			
            `

        tableBodyEl.appendChild(row)
    }
}


// Reset the from
function resetForm() {
    inputId.value = ''
    inputName.value = ''
    inputAge.value = ''
    inputType.value = 'Select Type'
    inputWeight.value = ''
    inputLength.value = ''
    inputColor.value = ''
    inputBreed.value = 'Select Breed'
    inputVaccinated.checked = false
    inputDewormed.checked = false
    inputSterilized.checked = false
}


// Show breed options
inputType.addEventListener('change', function (e) {
    // Clear breed options in breed input
    inputBreed.innerHTML = ''

    // Array of breed after user select type (cat or dog)
    let filtered = []

    // Add options to breed input based on type selected
    if (inputType.value != 'Select Type') {

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

// Toggle sidebar
sidebarEl.addEventListener('click', function (e) {
    const liItem = e.target.closest('li')

    if (!liItem) {

        sidebarEl.classList.toggle('active')
    }
})








