// Function to check if cookies are enabled
function areCookiesEnabled() {
    document.cookie = "testcookie";
    let enabled = document.cookie.indexOf("testcookie") !== -1;
    document.cookie = "testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return enabled;
}

// Function to get cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Function to set cookie
function setCookie(name, value, expiresInSeconds) {
    const d = new Date();
    d.setTime(d.getTime() + (expiresInSeconds * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'flex';
}

// Function to hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Function to save settings
function saveSettings() {
    const options = document.querySelectorAll('.toggle');
    const selectedOptions = {};
    options.forEach(option => {
        selectedOptions[option.parentElement.textContent.trim()] = option.checked;
    });
    setCookie('cookiePreferences', JSON.stringify(selectedOptions), 86400);
    hideModal('settingsModal');
}

// Function to show modal after 5 seconds
function showModalAfterDelay(modalId) {
    setTimeout(function() {
        showModal(modalId);
    }, 5000); // 5000 milliseconds = 5 seconds
}

// Function to get browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Firefox";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Edge";
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        browserName = "Internet Explorer";
    } else {
        browserName = "Unknown";
    }
    return browserName;
}

// Function to get operating system name
function getOSName() {
    const userAgent = navigator.userAgent;
    let osName;
    if (userAgent.indexOf("Windows") > -1) {
        osName = "Windows";
    } else if (userAgent.indexOf("Mac") > -1) {
        osName = "Macintosh";
    } else if (userAgent.indexOf("Linux") > -1) {
        osName = "Linux";
    } else if (userAgent.indexOf("Android") > -1) {
        osName = "Android";
    } else if (userAgent.indexOf("iOS") > -1) {
        osName = "iOS";
    } else {
        osName = "Unknown";
    }
    return osName;
}

window.onload = function() {
    let cookiePreferences = getCookie('cookiePreferences');

    if (!areCookiesEnabled() || !cookiePreferences) {
        showModalAfterDelay('cookieModal');
    }

    const acceptAllBtn = document.getElementById('acceptAllBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');

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

