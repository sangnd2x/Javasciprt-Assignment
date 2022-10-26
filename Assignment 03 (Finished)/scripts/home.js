'use strict'

// Get elements
const loginModal = document.getElementById('login-modal')
const logoutBtn = document.getElementById('btn-logout')
const welcomeMsg = document.getElementById('welcome-message')

// Get current user from session storage
if (getTempSave() == null) {
    tempUser = []
} else {
    tempUser = getTempSave()
}

// If there's user, log in
if (tempUser.length > 0) { 
    loginModal.style.display = 'none'
    welcomeMsg.textContent = `Hi ${tempUser[0].username}`
} 

// Log out event
logoutBtn.addEventListener('click', function () {
    // Clear user and settings in session storage
    tempUser = []
    tempSave(tempUser)
    tempSettings = []
    saveTempSetting(tempSettings)

    // Redirect to login page
    window.location.href = './pages/login.html'
})