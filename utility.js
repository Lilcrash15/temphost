// utility.js - Pump & Dump Portal

const EMPLOYEE_SESSION_KEY = 'isEmployeeAccessGranted_PumpDump';
const MANAGER_SESSION_KEY = 'isManagerAccessGranted_PumpDump';

function checkEmployeeSession() {
    return localStorage.getItem(EMPLOYEE_SESSION_KEY) === 'true';
}

function grantEmployeeSession() {
    localStorage.setItem(EMPLOYEE_SESSION_KEY, 'true');
}

function checkManagerSession() {
    return localStorage.getItem(MANAGER_SESSION_KEY) === 'true' && checkEmployeeSession();
}

function grantManagerSession() {
    localStorage.setItem(EMPLOYEE_SESSION_KEY, 'true');
    localStorage.setItem(MANAGER_SESSION_KEY, 'true');
}

function clearAllSessions() {
    localStorage.removeItem(EMPLOYEE_SESSION_KEY);
    localStorage.removeItem(MANAGER_SESSION_KEY);
    localStorage.removeItem('loggedInEmployeeName');
    localStorage.removeItem('loggedInEmployeeId');

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink && logoutLink.parentNode) logoutLink.parentNode.removeChild(logoutLink);

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const loginPages = ["index.html", "commission.html", "manager.html"];
    if (loginPages.includes(currentPage)) {
        window.location.reload();
    } else {
        window.location.href = 'index.html';
    }
}

function addLogoutButton() {
    const dropdownContent = document.querySelector('.navbar .dropdown-content');
    if (dropdownContent && !document.getElementById('logout-link')) {
        const logoutLink = document.createElement('a');
        logoutLink.href = "#";
        logoutLink.id = 'logout-link';
        logoutLink.textContent = 'Logout';
        logoutLink.style.color = '#fc8181';
        logoutLink.addEventListener('click', (e) => { e.preventDefault(); clearAllSessions(); });
        dropdownContent.appendChild(logoutLink);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Dropdown hover
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (!dropdown || !dropdownContent) return;
    let hideTimeout;
    dropdown.addEventListener('mouseenter', () => { clearTimeout(hideTimeout); dropdownContent.style.display = 'block'; });
    dropdown.addEventListener('mouseleave', () => { hideTimeout = setTimeout(() => { dropdownContent.style.display = 'none'; }, 400); });
    dropdownContent.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    dropdownContent.addEventListener('mouseleave', () => { hideTimeout = setTimeout(() => { dropdownContent.style.display = 'none'; }, 400); });
});
