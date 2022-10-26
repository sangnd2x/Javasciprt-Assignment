'use strict'
// Select input
const inputBreed1 = document.getElementById('breed__input-breed')
const inputType1 = document.getElementById('breed__input-type')
const submitBtn1 = document.getElementById('breed__submit-btn')
const breedTable = document.getElementById('breed__tbody')
const sidebarEl = document.getElementById('sidebar')

// Breeds list
let breedList = []

// Save input to breeds list
submitBtn1.addEventListener('click', function () {
    // Breed objects
    const breed = {
        type: inputType1.value,
        name: inputBreed1.value
    }

    // Add breed obj to breedList array
    if (inputBreed1.value !== '' || inputBreed1.value === null) {
        if (inputType1.value !== 'Select Type') {
            breedList.push(breed)
            saveToStorageBreed(breedList)
            renderBreedTable(breedList)
        }
    }


    // Reset the from
    function resetForm() {
        inputBreed1.value = ''
        inputType1.value = 'Select Type'

    }

    saveToStorageBreed(breedList)
    resetForm()
})

if (getFromStorageBreed() == null) {
    breedList = []
} else {
    breedList = getFromStorageBreed()
}

// Render breed table
function renderBreedTable(breedList) {
    breedTable.innerHTML = ''

    for (let i = 0; i < breedList.length; i++) {
        const breedRow = document.createElement('tr')

        breedRow.innerHTML = `
        <td> ${i + 1} </td> 
        <td> ${breedList[i].name} 
        <td> ${breedList[i].type} </td>
        <td><button data-id="${breedList[i].id}" type="button" class="btn btn-danger" id="btn-delete">Delete</button></td>
        `

        breedTable.appendChild(breedRow)
    }
}

renderBreedTable(breedList)

breedTable.addEventListener('click', function (e) {
    // If delete btn is not clicked, stop the function
    if (e.target.id != 'btn-delete') return

    // Get breed name when clicking the button
    const breedName = e.target.getAttribute('data-id')
    // If there's no breed name, stop the function
    if (!breedName) return

    // Confirm delete
    const isConfirm = confirm('Are you sure?')

    // If user select no, stop the function 
    if (!isConfirm) return

    // Remove said breed from breedList
    breedList.splice(breedList.findIndex(breed => breed.name == breedName), 1)

    // Rewrite breedList in local storage
    saveToStorageBreed(breedList)

    // Render breedList again
    renderBreedTable(breedList)
})

// Toggle sidebar
sidebarEl.addEventListener('click', function (e) {
    const liItem = e.target.closest('li')

    if (!liItem) {

        sidebarEl.classList.toggle('active')
    }
})
