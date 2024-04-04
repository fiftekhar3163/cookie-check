// Check if cookies are enabled
function areCookiesEnabled() {
    document.cookie = "testcookie";
    var enabled = document.cookie.indexOf("testcookie") !== -1;
    document.cookie = "testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return enabled;
}

// Get cookie by name
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Set cookie
function setCookie(name, value, expiresInSeconds) {
    var d = new Date();
    d.setTime(d.getTime() + (expiresInSeconds * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to show modal
function showModal(modalId) {
    var modal = document.getElementById(modalId);
    var overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'flex';
}

// Function to hide modal
function hideModal(modalId) {
    var modal = document.getElementById(modalId);
    var overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Function to handle saving settings
function saveSettings() {
    var options = document.querySelectorAll('.toggle');
    var selectedOptions = {};
    options.forEach(option => {
        selectedOptions[option.parentElement.textContent.trim()] = option.checked;
    });
    setCookie('cookiePreferences', JSON.stringify(selectedOptions), 86400);
    hideModal('settingsModal');
}

window.onload = function() {
    var cookiePreferences = getCookie('cookiePreferences');

    if (!areCookiesEnabled() || !cookiePreferences) {
        setTimeout(function() {
            showModal('cookieModal');
        }, 1000);
    }

    var acceptAllBtn = document.getElementById('acceptAllBtn');
    var settingsBtn = document.getElementById('settingsBtn');
    var saveSettingsBtn = document.getElementById('saveSettingsBtn');

    acceptAllBtn.onclick = function() {
        setCookie('cookiePreferences', JSON.stringify({}), 86400);
        hideModal('cookieModal');
    };

    settingsBtn.onclick = function() {
        showModal('settingsModal');
    };

    saveSettingsBtn.onclick = function() {
        saveSettings();
    };
};
