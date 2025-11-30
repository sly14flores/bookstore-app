// BookStore JavaScript - Plain HTML Version

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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadBooks();
    setupEventListeners();
    updateCartDisplay();
    updateUI();
});

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

// Save data to localStorage
function saveData() {
    localStorage.setItem('bookstore_books', JSON.stringify(books));
    localStorage.setItem('bookstore_cart', JSON.stringify(cart));
    localStorage.setItem('bookstore_orders', JSON.stringify(orders));
    if (currentUser) {
        localStorage.setItem('bookstore_currentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('bookstore_currentUser');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', filterBooks);
    document.getElementById('categoryFilter').addEventListener('change', filterBooks);

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Add book form
    document.getElementById('addBookForm').addEventListener('submit', handleAddBook);

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

// Load and display books
function loadBooks() {
    const container = document.getElementById('booksContainer');
    container.innerHTML = '';

    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-book fa-3x text-muted mb-3"></i>
                <h4>No books found</h4>
                <p class="text-muted">Try adjusting your search terms or browse different categories.</p>
                <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }

    filteredBooks.forEach(book => {
        const bookCard = createBookCard(book);
        container.appendChild(bookCard);
    });
}

// Create book card element
function createBookCard(book) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    const stars = generateStars(book.rating);
    const inStock = book.stock > 0;
    
    col.innerHTML = `
        <div class="card book-card h-100 fade-in">
            <div class="book-cover">
                <img src="${book.image}" alt="${book.title}" class="card-img-top">
            </div>
            <div class="card-body book-info d-flex flex-column">
                <span class="category-badge mb-2">${book.category}</span>
                <h5 class="book-title">${book.title}</h5>
                <p class="book-author">${book.author}</p>
                <div class="rating mb-2">${stars} <small>(${book.rating})</small></div>
                <p class="card-text text-muted small">${book.description.substring(0, 100)}...</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="book-price">$${book.price}</span>
                        <small class="text-muted">${inStock ? `${book.stock} in stock` : 'Out of stock'}</small>
                    </div>
                    <button class="btn btn-primary w-100 ${!inStock ? 'disabled' : ''}" 
                            onclick="addToCart('${book.id}')" 
                            ${!inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart me-2"></i>
                        ${inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
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

// Filter books based on search and category
function filterBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    filteredBooks = books.filter(book => {
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || book.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    loadBooks();
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    filteredBooks = [...books];
    loadBooks();
}

// Add book to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.stock === 0) return;
    
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
    
    saveData();
    updateCartDisplay();
    showAlert(`"${book.title}" added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.bookId !== bookId);
    saveData();
    updateCartDisplay();
    loadCartItems();
}

// Update item quantity in cart
function updateQuantity(bookId, newQuantity) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    if (newQuantity <= 0) {
        removeFromCart(bookId);
        return;
    }
    
    if (newQuantity > book.stock) {
        showAlert('Cannot exceed available stock.', 'warning');
        return;
    }
    
    const item = cart.find(item => item.bookId === bookId);
    if (item) {
        item.quantity = newQuantity;
        saveData();
        updateCartDisplay();
        loadCartItems();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    
    const cartTotal = calculateCartTotal();
    document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.length === 0;
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => {
        const book = books.find(b => b.id === item.bookId);
        return total + (book ? book.price * item.quantity : 0);
    }, 0);
}

// Load cart items in modal
function loadCartItems() {
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(emptyCart);
        return;
    }
    
    emptyCart.style.display = 'none';
    container.innerHTML = '';
    
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (!book) return;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex align-items-center';
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
}

// Toggle cart modal
function toggleCart() {
    loadCartItems();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Toggle login modal
function toggleLogin() {
    if (currentUser) {
        // User is logged in, show user menu or profile
        return;
    }
    
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        saveData();
        updateUI();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        showAlert(`Welcome back, ${user.name}!`, 'success');
        
        // Reset form
        document.getElementById('loginForm').reset();
    } else {
        showAlert('Invalid email or password', 'danger');
    }
}

// Logout
function logout() {
    currentUser = null;
    saveData();
    updateUI();
    showAlert('Logged out successfully', 'success');
}

// Update UI based on authentication state
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const adminLink = document.getElementById('adminLink');
    
    if (currentUser) {
        loginBtn.style.display = 'none';
        userInfo.classList.remove('d-none');
        document.getElementById('userName').textContent = currentUser.name;
        
        if (currentUser.role === 'admin') {
            adminLink.style.display = 'block';
        } else {
            adminLink.style.display = 'none';
        }
    } else {
        loginBtn.style.display = 'block';
        userInfo.classList.add('d-none');
        adminLink.style.display = 'none';
    }
}

// Show admin panel
function showAdminPanel() {
    if (!currentUser || currentUser.role !== 'admin') {
        showAlert('Access denied. Admin privileges required.', 'danger');
        return;
    }
    
    loadAdminBooks();
    loadAdminOrders();
    const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
    adminModal.show();
}

// Load books in admin panel
function loadAdminBooks() {
    const tbody = document.getElementById('adminBooksTable');
    tbody.innerHTML = '';
    
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>$${book.price}</td>
            <td>${book.stock}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editBook('${book.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteBook('${book.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load orders in admin panel
function loadAdminOrders() {
    const tbody = document.getElementById('ordersTable');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No orders found</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        const orderDate = new Date(order.createdAt).toLocaleDateString();
        row.innerHTML = `
            <td>#${order.id.slice(-6)}</td>
            <td>${order.customerInfo.name}</td>
            <td>${order.items.length} items</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${orderDate}</td>
        `;
        tbody.appendChild(row);
    });
}

// Show add book form
function showAddBookForm() {
    const addBookModal = new bootstrap.Modal(document.getElementById('addBookModal'));
    addBookModal.show();
}

// Handle add book
function handleAddBook(e) {
    e.preventDefault();
    
    const newBook = {
        id: Date.now().toString(),
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        price: parseFloat(document.getElementById('bookPrice').value),
        stock: parseInt(document.getElementById('bookStock').value),
        category: document.getElementById('bookCategory').value,
        rating: parseFloat(document.getElementById('bookRating').value),
        description: document.getElementById('bookDescription').value,
        image: `https://via.placeholder.com/200x300/4f46e5/ffffff?text=${encodeURIComponent(document.getElementById('bookTitle').value)}`
    };
    
    books.push(newBook);
    filteredBooks = [...books];
    saveData();
    loadBooks();
    loadAdminBooks();
    
    bootstrap.Modal.getInstance(document.getElementById('addBookModal')).hide();
    document.getElementById('addBookForm').reset();
    showAlert('Book added successfully!', 'success');
}

// Delete book
function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== bookId);
        filteredBooks = filteredBooks.filter(book => book.id !== bookId);
        
        // Remove from cart if exists
        cart = cart.filter(item => item.bookId !== bookId);
        
        saveData();
        loadBooks();
        loadAdminBooks();
        updateCartDisplay();
        showAlert('Book deleted successfully!', 'success');
    }
}

// Checkout process
function checkout() {
    if (!currentUser) {
        showAlert('Please login to proceed with checkout', 'warning');
        toggleLogin();
        return;
    }
    
    if (cart.length === 0) {
        showAlert('Your cart is empty', 'warning');
        return;
    }
    
    // Pre-fill customer info if user is logged in
    document.getElementById('customerName').value = currentUser.name;
    document.getElementById('customerEmail').value = currentUser.email;
    document.getElementById('checkoutTotal').textContent = calculateCartTotal().toFixed(2);
    
    bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

// Handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    const order = {
        id: Date.now().toString(),
        userId: currentUser.id,
        items: [...cart],
        total: calculateCartTotal(),
        customerInfo: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            address: document.getElementById('customerAddress').value
        },
        createdAt: new Date().toISOString()
    };
    
    // Update book stock
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book) {
            book.stock -= item.quantity;
        }
    });
    
    orders.push(order);
    cart = [];
    
    saveData();
    updateCartDisplay();
    loadBooks();
    
    bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
    document.getElementById('checkoutForm').reset();
    
    showAlert('Order placed successfully! Thank you for your purchase.', 'success');
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

// Add click handler for admin link
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('adminLink').addEventListener('click', function(e) {
        e.preventDefault();
        showAdminPanel();
    });
});