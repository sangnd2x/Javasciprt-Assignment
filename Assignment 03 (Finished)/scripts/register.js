'use strict'

// Get elements
const firstNameInput = document.getElementById('input-firstname')
const lastNameInput = document.getElementById('input-lastname')
const usernameInput = document.getElementById('input-username')
const passwordInput = document.getElementById('input-password')
const passwordConfirmInput = document.getElementById('input-password-confirm')
const registerBtn = document.getElementById('btn-submit')


if (getFromStorage() == null) {
    userArr = []
} else {
    userArr = getFromStorage()
   
    for (let i = 0; i < userArr.length; i++){
        userCl = parseUser(userArr[i])
        userClArr.push(userCl)
    }

    console.log(userClArr)

}

// Add event to register button
registerBtn.addEventListener('click', function () {
    validate(firstNameInput.value, lastNameInput.value, usernameInput.value, passwordInput.value, passwordConfirmInput.value)
})

// Validate inputs function
function validate(firstName, lastName, username, password, passwordConfirm) {
    if (userClArr.length != 0) {
        for (let i = 0; i < userClArr.length; i++) {
            if (usernameInput.value === userClArr[i].username) {
                return alert('This username has already been registered')
            }
        }
    }
    
    if (firstNameInput.value != '' || firstNameInput.value == null) {
        if (lastNameInput.value != '' || lastNameInput.value == null) {
            if (usernameInput.value != '' || usernameInput.value == null) {
                if (passwordInput.value == passwordConfirmInput.value) {
                    if (passwordInput.value.length > 8) {
                        newUser = new User(firstName, lastName, username, password)
                        userArr.push(newUser)
                        saveToStorage(userArr)
                        window.location.href = '../pages/login.html'
                    } else {
                        alert('Password must contain more than 8 characters')
                    }
                } else {
                    alert('Passwords are not matched')
                }
            } else {
                alert('Must type in username')
            }
        } else {
            alert('Must type in last name')
        }
    } else {
        alert('Must type in first name')
    } 
}



