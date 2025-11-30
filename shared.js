// Shared JavaScript functions for BookStore
// This file contains common functions used across multiple pages

// Sample book data
const sampleBooks = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 12.99,
        description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
        category: 'Fiction',
        stock: 25,
        rating: 4.2,
        image: 'https://via.placeholder.com/200x300/4f46e5/ffffff?text=The+Great+Gatsby'
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 14.99,
        description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
        category: 'Fiction',
        stock: 18,
        rating: 4.5,
        image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=To+Kill+a+Mockingbird'
    },
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        price: 13.99,
        description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
        category: 'Science Fiction',
        stock: 30,
        rating: 4.4,
        image: 'https://via.placeholder.com/200x300/ef4444/ffffff?text=1984'
    },
    {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 11.99,
        description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
        category: 'Romance',
        stock: 22,
        rating: 4.3,
        image: 'https://via.placeholder.com/200x300/8b5cf6/ffffff?text=Pride+and+Prejudice'
    },
    {
        id: '5',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        price: 13.50,
        description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
        category: 'Fiction',
        stock: 15,
        rating: 3.8,
        image: 'https://via.placeholder.com/200x300/f59e0b/ffffff?text=The+Catcher+in+the+Rye'
    },
    {
        id: '6',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        price: 16.99,
        description: 'The first book in the beloved series about a young wizard discovering his magical heritage.',
        category: 'Fantasy',
        stock: 40,
        rating: 4.7,
        image: 'https://via.placeholder.com/200x300/06b6d4/ffffff?text=Harry+Potter'
    },
    {
        id: '7',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        price: 24.99,
        description: 'An epic high fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord.',
        category: 'Fantasy',
        stock: 12,
        rating: 4.6,
        image: 'https://via.placeholder.com/200x300/84cc16/ffffff?text=Lord+of+the+Rings'
    },
    {
        id: '8',
        title: 'Dune',
        author: 'Frank Herbert',
        price: 18.99,
        description: 'A science fiction masterpiece set on the desert planet Arrakis, exploring politics, religion, and ecology.',
        category: 'Science Fiction',
        stock: 20,
        rating: 4.3,
        image: 'https://via.placeholder.com/200x300/f97316/ffffff?text=Dune'
    }
];

// Global variables
let books = [];
let cart = [];
let orders = [];
let currentUser = null;
let filteredBooks = [];

// Demo users
const demoUsers = [
    { id: '1', email: 'admin@bookstore.com', password: 'password', name: 'Admin User', role: 'admin' },
    { id: '2', email: 'customer@bookstore.com', password: 'password', name: 'John Customer', role: 'customer' }
];

// Initialize data from localStorage or use sample data
function initializeData() {
    // Load books
    const storedBooks = localStorage.getItem('bookstore_books');
    books = storedBooks ? JSON.parse(storedBooks) : [...sampleBooks];
    if (!storedBooks) {
        localStorage.setItem('bookstore_books', JSON.stringify(books));
    }

    // Load cart
    const storedCart = localStorage.getItem('bookstore_cart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    // Load orders
    const storedOrders = localStorage.getItem('bookstore_orders');
    orders = storedOrders ? JSON.parse(storedOrders) : [];

    // Load current user
    const storedUser = localStorage.getItem('bookstore_currentUser');
    currentUser = storedUser ? JSON.parse(storedUser) : null;

    filteredBooks = [...books];
}

// Data access functions
function getBooks() {
    return books;
}

function saveBooks(booksData) {
    books = booksData;
    localStorage.setItem('bookstore_books', JSON.stringify(books));
}

function getCart() {
    return cart;
}

function saveCart(cartData) {
    cart = cartData;
    localStorage.setItem('bookstore_cart', JSON.stringify(cart));
}

function getOrders() {
    return orders;
}

function saveOrders(ordersData) {
    orders = ordersData;
    localStorage.setItem('bookstore_orders', JSON.stringify(orders));
}

function getCurrentUser() {
    return currentUser;
}

function setCurrentUser(user) {
    currentUser = user;
    if (user) {
        localStorage.setItem('bookstore_currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('bookstore_currentUser');
    }
}

// Add book to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.stock === 0) {
        showAlert('Book is out of stock', 'warning');
        return;
    }
    
    const existingItem = cart.find(item => item.bookId === bookId);
    
    if (existingItem) {
        if (existingItem.quantity < book.stock) {
            existingItem.quantity += 1;
        } else {
            showAlert('Cannot add more items. Stock limit reached.', 'warning');
            return;
        }
    } else {
        cart.push({ bookId: bookId, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartDisplay();
    showAlert(`"${book.title}" added to cart!`, 'success');
    
    // Add to recently viewed
    addToRecentlyViewed(bookId);
}

// Remove item from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.bookId !== bookId);
    saveCart(cart);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => {
        const book = books.find(b => b.id === item.bookId);
        return total + (book ? book.price * item.quantity : 0);
    }, 0);
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Toggle login modal or redirect to login page
function toggleLogin() {
    if (currentUser) {
        // User is logged in, show user menu or profile
        window.location.href = 'profile.php';
        return;
    }
    
    // Check if we're on a page with login modal
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
    } else {
        // Redirect to login page
        window.location.href = 'login.php';
    }
}

// Toggle cart modal or redirect to cart page
function toggleCart() {
    // Check if we're on a page with cart modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        loadCartItems();
        const modal = new bootstrap.Modal(cartModal);
        modal.show();
    } else {
        // Redirect to cart page
        window.location.href = 'cart.php';
    }
}

// Load cart items in modal (for pages that have cart modal)
function loadCartItems() {
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!container) return; // Not on a page with cart modal
    
    if (cart.length === 0) {
        if (emptyCart) {
            emptyCart.style.display = 'block';
            container.innerHTML = '';
            container.appendChild(emptyCart);
        }
        return;
    }
    
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }
    container.innerHTML = '';
    
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (!book) return;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex align-items-center mb-3 p-3 border rounded';
        cartItem.innerHTML = `
            <div class="cart-item-image me-3">
                <img src="${book.image}" alt="${book.title}" style="width: 60px; height: 80px; object-fit: cover; border-radius: 4px;">
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1">${book.title}</h6>
                <p class="text-muted small mb-1">${book.author}</p>
                <p class="text-primary fw-bold mb-0">$${book.price}</p>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${book.id}', ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="mx-3">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${book.id}', ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger ms-3" onclick="removeFromCart('${book.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        container.appendChild(cartItem);
    });
    
    // Update cart total
    const cartTotal = calculateCartTotal();
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = cartTotal.toFixed(2);
    }
}

// Update quantity function
function updateQuantity(bookId, newQuantity) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    if (newQuantity <= 0) {
        removeFromCart(bookId);
        if (document.getElementById('cartModal')) {
            loadCartItems();
        }
        return;
    }
    
    if (newQuantity > book.stock) {
        showAlert('Cannot exceed available stock.', 'warning');
        return;
    }
    
    const item = cart.find(item => item.bookId === bookId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        updateCartDisplay();
        if (document.getElementById('cartModal')) {
            loadCartItems();
        }
    }
}

// Logout function
function logout() {
    setCurrentUser(null);
    updateUI();
    showAlert('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'home.php';
    }, 1500);
}

// Update UI based on authentication state
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const adminLink = document.getElementById('adminLink');
    
    if (currentUser) {
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
        if (userInfo) {
            userInfo.classList.remove('d-none');
            const userName = document.getElementById('userName');
            if (userName) {
                userName.textContent = currentUser.name;
            }
        }
        
        if (adminLink && currentUser.role === 'admin') {
            adminLink.style.display = 'block';
        } else if (adminLink) {
            adminLink.style.display = 'none';
        }
    } else {
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }
        if (userInfo) {
            userInfo.classList.add('d-none');
        }
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Add to recently viewed
function addToRecentlyViewed(bookId) {
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== bookId);
    
    // Add to beginning
    recentlyViewed.unshift(bookId);
    
    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Clear all filters (for books page)
function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (sortFilter) sortFilter.value = '';
    
    if (typeof filterBooks === 'function') {
        filterBooks();
    }
}

// Checkout function
function checkout() {
    if (!currentUser) {
        showAlert('Please login to proceed with checkout', 'warning');
        setTimeout(() => {
            window.location.href = 'login.php';
        }, 1500);
        return;
    }
    
    if (cart.length === 0) {
        showAlert('Your cart is empty', 'warning');
        return;
    }
    
    window.location.href = 'checkout.php';
}

// Show admin panel
function showAdminPanel() {
    if (!currentUser || currentUser.role !== 'admin') {
        showAlert('Access denied. Admin privileges required.', 'danger');
        return;
    }
    
    window.location.href = 'admin.php';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data if not already done
    if (typeof window.bookstoreInitialized === 'undefined') {
        initializeData();
        window.bookstoreInitialized = true;
    }
});