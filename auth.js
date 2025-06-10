let userRole = '';
let users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
];

function register() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const role = document.getElementById('regRole').value;
    if (!username || !password) {
        alert('Username and password are required.');
        return;
    }
    if (users.find(user => user.username === username)) {
        alert('Username already exists.');
        return;
    }
    users.push({ username, password, role });
    alert('Registration successful! You can now log in.');
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regRole').value = 'user';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        userRole = user.role;
        document.getElementById('admin-link').style.display = userRole === 'admin' ? 'block' : 'none';
        document.getElementById('login').style.display = 'none';
        document.querySelector('nav').style.display = 'block';
        document.getElementById('home').style.display = 'flex';
        document.getElementById('about').style.display = 'block';
        document.getElementById('map-section').style.display = 'block';
        document.getElementById('map-container').style.display = 'block';
        document.querySelector('.sidebar').style.display = 'block';
        document.querySelector('.control-panel').style.display = 'block';
        document.getElementById('data-section').style.display = 'block';
        if (userRole === 'admin') {
            document.getElementById('admin-section').style.display = 'block';
        }
        document.getElementById('contact').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
        initializeMap();
        displayLandData();
        if (userRole === 'admin') {
            displayAdminData();
        }
    } else {
        alert('Invalid username or password');
    }
}

function logout() {
    userRole = '';
    document.getElementById('login').style.display = 'flex';
    document.querySelector('nav').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.getElementById('map-section').style.display = 'none';
    document.getElementById('map-container').style.display = 'none';
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.control-panel').style.display = 'none';
    document.getElementById('data-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    if (map) {
        map.remove();
        map = null;
    }
}