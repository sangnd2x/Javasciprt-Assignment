'use strict'

// Get elements
const pageSizeInput = document.getElementById('input-page-size')
const newsCategory = document.getElementById('input-category')
const saveSettingsBtn = document.getElementById('btn-submit')

// Save Settings event
saveSettingsBtn.addEventListener('click', function () {
    // if (pageSizeInput.value != '' && pageSizeInput.value != null) {
        tempSettings = [pageSizeInput.value, newsCategory.value]
        saveTempSetting(tempSettings)
    // } else {
    //     alert
    // }
})