// Login page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    updateCartDisplay();
    
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        window.location.href = 'home.php';
    }
});

function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const demoUsers = [
        { id: '1', email: 'admin@bookstore.com', password: 'password', name: 'Admin User', role: 'admin' },
        { id: '2', email: 'customer@bookstore.com', password: 'password', name: 'John Customer', role: 'customer' }
    ];
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        setCurrentUser(user);
        showAlert(`Welcome back, ${user.name}!`, 'success');
        
        // Redirect based on role
        setTimeout(() => {
            if (user.role === 'admin') {
                window.location.href = 'admin.php';
            } else {
                window.location.href = 'home.php';
            }
        }, 1500);
    } else {
        showAlert('Invalid email or password', 'danger');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'danger');
        return;
    }
    
    // Check if user already exists
    const demoUsers = [
        { id: '1', email: 'admin@bookstore.com', password: 'password', name: 'Admin User', role: 'admin' },
        { id: '2', email: 'customer@bookstore.com', password: 'password', name: 'John Customer', role: 'customer' }
    ];
    
    const existingUser = demoUsers.find(u => u.email === email);
    if (existingUser) {
        showAlert('User with this email already exists', 'danger');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: 'customer',
        createdAt: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
    showAlert('Registration successful! Welcome to BookStore!', 'success');
    
    setTimeout(() => {
        window.location.href = 'home.php';
    }, 1500);
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    // Simulate password reset
    showAlert('Password reset link sent to your email!', 'info');
    bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal')).hide();
    document.getElementById('forgotPasswordForm').reset();
}

function quickLogin(userType) {
    const demoUsers = {
        admin: { email: 'admin@bookstore.com', password: 'password' },
        customer: { email: 'customer@bookstore.com', password: 'password' }
    };
    
    const credentials = demoUsers[userType];
    if (credentials) {
        document.getElementById('email').value = credentials.email;
        document.getElementById('password').value = credentials.password;
        
        // Auto-submit the form
        setTimeout(() => {
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }, 500);
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}