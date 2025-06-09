// Main application logic
let map;
let layers = {};
let userRole = '';
let editingId = null;
let users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
];
let landData = [
    // Your land data array here
];

// Load components
function loadComponents() {
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
            setupNavLinks();
        });
    
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        });
    
    fetch('components/edit-modal.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('edit-modal-container').innerHTML = html;
        });
}

// Navigation functions
function setupNavLinks() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            loadSection(sectionId);
        });
    });
}

function loadSection(sectionId) {
    fetch(`sections/${sectionId}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            // Initialize section-specific functionality
            if (sectionId === 'map') initializeMap();
            if (sectionId === 'data') displayLandData();
            if (sectionId === 'admin') displayAdminData();
        });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    loadSection('home'); // Load home by default
    
    // Add all your existing functions here (login, register, map functions, etc.)
    // ...
});

// Add all other JavaScript functions from your original file here