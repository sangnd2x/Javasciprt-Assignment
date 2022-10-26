'use strict'

// Get elements
const usernameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
const loginBtn = document.getElementById('btn-submit')

// Get user array from local storage
if (getFromStorage() == null) {
    userArr = []
} else {
    userArr = getFromStorage()
    
    // Parse user from local storage into intances of class User
    for (let i = 0; i < userArr.length; i++){
        userCl = parseUser(userArr[i])
        userClArr.push(userCl)
    }
}


// Add event to login button
loginBtn.addEventListener('click', function () {
    validateUser(usernameInput.value, passwordInput.value)
})

// Validate user log in
function validateUser(usernameInput, passwordInput) {

    if (usernameInput != '' || usernameInput == null) {
        if (passwordInput != '' || passwordInput == null) {
            // Check if username and password input are correct
            let curUser = userClArr.filter(user => user.username == usernameInput && user.password == passwordInput)
            
            // If corrected, log in and redirect to home page
            if (curUser.length > 0) {
                tempSave(curUser)
                window.location.href = '../index.html'
            }
            
            // Return error if no username found or wrong password
            let hasUsername = userClArr.filter(user => user.username == usernameInput)
            let hasPassword = hasUsername.filter(user => user.password == passwordInput)

            if (hasUsername.length == 0) return alert('Username not found')
            if (hasPassword.length == 0) return alert('Wrong password')
        }
    }
}

