'use strict'

const exportBtn = document.getElementById('export-btn')
const importBtn = document.getElementById('import-btn')


// Pet array stores all pets data
let petArr = []

// Get petArr from local storage
if (getFromStorage() == null) {
    petArr = []
} else {
    petArr = getFromStorage()
}


// Export petArr to json
exportBtn.addEventListener('click', function () {
    const exportFile = JSON.stringify(petArr)
    var blob = new Blob([exportFile], { type: "application/json" })
    saveAs(blob, 'pet data')
})


// Import json file to localstorage
importBtn.addEventListener('click', function () {
    // Get file from input field
    const inputFile = document.getElementById('input-file').files[0]
    let fileString = ''
    let newArr = []

    if (inputFile) {
        let reader = new FileReader()

        // Read json to text
        reader.readAsText(inputFile, "UTF-8")
        reader.onload = function (evt) {
            fileString = evt.target.result
            newArr = JSON.parse(fileString)
            for (let i = 0; i < newArr.length; i++) {
                let newPet = newArr[i]
                petArr.push(newPet)
                saveToStorage(petArr)
            }
        }
    }



})