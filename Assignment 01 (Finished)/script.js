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



// Pet array stores all pets data
let petArr = []

// Healthy pets
let healthyCheck = false

// Healthy pets array
let healthyPetArr = []

// Task 1:  Add even to submit button
submitBtn.addEventListener('click', function () {

    //Task 2: Get data from inputs and save to an object
    const data = {
        id: inputId.value,
        name: inputName.value,
        age: parseInt(inputAge.value),
        type: inputType.value,
        weight: parseInt(inputWeight.value),
        length: parseInt(inputLength.value),
        color: inputColor.value,
        breed: inputBreed.value,
        vaccinated: inputVaccinated.checked,
        dewormed: inputDewormed.checked,
        sterilized: inputSterilized.checked,
        date: new Date().toLocaleDateString(),
    }


    // Task 3:  Input validation
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
            if (data.length >= 1 && data.length <= 100) {
                // Check if type is selected
                if (data.type !== 'Select Type' && data.type !== null) {
                    // Check if breed is selected
                    if (data.breed !== 'Select Breed' && data.breed !== null) {
                        petArr.push(data)
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

// Task 4: Render pet list
// Show pet which was added
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
            <td> ${petArr[i].name} </td> <td>3</td>
            <td> ${petArr[i].type} </td>
            <td> ${petArr[i].weight} kg</td>
            <td> ${petArr[i].length} cm</td>
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

// Task 5: Reset the from
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

// Task 6: Delete pet
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
    renderTableData(petArr)
})

// Task 7: Show healthy pets
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









