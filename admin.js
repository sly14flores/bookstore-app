// Admin page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    checkAdminAccess();
    loadDashboardData();
    setupEventListeners();
    updateUI();
});

function checkAdminAccess() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        showAlert('Access denied. Admin privileges required.', 'danger');
        setTimeout(() => {
            window.location.href = 'login.php';
        }, 2000);
        return;
    }
    
    document.getElementById('adminName').textContent = currentUser.name;
}

function setupEventListeners() {
    document.getElementById('addBookForm').addEventListener('submit', handleAddBook);
    document.getElementById('editBookForm').addEventListener('submit', handleEditBook);
}

function loadDashboardData() {
    const books = getBooks();
    const orders = getOrders();
    const users = getDemoUsers();
    
    // Update stats
    document.getElementById('totalBooksCount').textContent = books.length;
    document.getElementById('totalOrdersCount').textContent = orders.length;
    document.getElementById('totalUsersCount').textContent = users.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    
    loadRecentOrders();
    loadLowStockBooks();
    loadBooksTable();
    loadOrdersTable();
    loadUsersTable();
}

function loadRecentOrders() {
    const orders = getOrders().slice(-5).reverse();
    const container = document.getElementById('recentOrders');
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="text-muted">No recent orders</p>';
        return;
    }
    
    container.innerHTML = '';
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'mb-2 p-2 border-bottom';
        orderElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <strong>#${order.id.slice(-6)}</strong><br>
                    <small class="text-muted">${order.customerInfo.firstName} ${order.customerInfo.lastName}</small>
                </div>
                <div class="text-end">
                    <strong>$${order.total.toFixed(2)}</strong><br>
                    <span class="badge bg-primary">${order.status}</span>
                </div>
            </div>
        `;
        container.appendChild(orderElement);
    });
}

function loadLowStockBooks() {
    const books = getBooks().filter(book => book.stock <= 5);
    const container = document.getElementById('lowStockBooks');
    
    if (books.length === 0) {
        container.innerHTML = '<p class="text-success">All books are well stocked!</p>';
        return;
    }
    
    container.innerHTML = '';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'mb-2 p-2 border-bottom';
        bookElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${book.title}</strong><br>
                    <small class="text-muted">${book.author}</small>
                </div>
                <span class="badge ${book.stock === 0 ? 'bg-danger' : 'bg-warning'}">${book.stock} left</span>
            </div>
        `;
        container.appendChild(bookElement);
    });
}

function loadBooksTable() {
    const books = getBooks();
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';
    
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${book.image}" alt="${book.title}" style="width: 40px; height: 50px; object-fit: cover;"></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><span class="badge bg-secondary">${book.category}</span></td>
            <td>$${book.price}</td>
            <td><span class="badge ${book.stock > 5 ? 'bg-success' : book.stock > 0 ? 'bg-warning' : 'bg-danger'}">${book.stock}</span></td>
            <td>${book.rating}/5</td>
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

function loadOrdersTable(filter = 'all') {
    let orders = getOrders();
    
    if (filter !== 'all') {
        orders = orders.filter(order => order.status === filter);
    }
    
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No orders found</td></tr>';
        return;
    }
    
    orders.reverse().forEach(order => {
        const row = document.createElement('tr');
        const statusClass = getStatusClass(order.status);
        row.innerHTML = `
            <td>#${order.id.slice(-6)}</td>
            <td>${order.customerInfo.firstName} ${order.customerInfo.lastName}</td>
            <td>${order.items.length} items</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="badge ${statusClass}">${order.status}</span></td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        Actions
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'processing')">Mark Processing</a></li>
                        <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'shipped')">Mark Shipped</a></li>
                        <li><a class="dropdown-item" href="#" onclick="updateOrderStatus('${order.id}', 'delivered')">Mark Delivered</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="deleteOrder('${order.id}')">Delete Order</a></li>
                    </ul>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadUsersTable() {
    const users = getDemoUsers();
    const orders = getOrders();
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const userOrders = orders.filter(o => o.userId === user.id);
        const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">${user.role}</span></td>
            <td>${userOrders.length}</td>
            <td>$${totalSpent.toFixed(2)}</td>
            <td>${new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewUserDetails('${user.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

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
        image: document.getElementById('bookImage').value || `https://via.placeholder.com/200x300/4f46e5/ffffff?text=${encodeURIComponent(document.getElementById('bookTitle').value)}`
    };
    
    const books = getBooks();
    books.push(newBook);
    saveBooks(books);
    
    bootstrap.Modal.getInstance(document.getElementById('addBookModal')).hide();
    document.getElementById('addBookForm').reset();
    loadDashboardData();
    showAlert('Book added successfully!', 'success');
}

function saveBook() {
    document.getElementById('addBookForm').dispatchEvent(new Event('submit'));
}

function editBook(bookId) {
    const book = getBooks().find(b => b.id === bookId);
    if (!book) return;
    
    // Populate edit form
    document.getElementById('editBookId').value = book.id;
    document.getElementById('editBookTitle').value = book.title;
    document.getElementById('editBookAuthor').value = book.author;
    document.getElementById('editBookPrice').value = book.price;
    document.getElementById('editBookStock').value = book.stock;
    document.getElementById('editBookCategory').value = book.category;
    document.getElementById('editBookRating').value = book.rating;
    document.getElementById('editBookDescription').value = book.description;
    document.getElementById('editBookImage').value = book.image;
    
    const editModal = new bootstrap.Modal(document.getElementById('editBookModal'));
    editModal.show();
}

function handleEditBook(e) {
    e.preventDefault();
    updateBook();
}

function updateBook() {
    const bookId = document.getElementById('editBookId').value;
    const books = getBooks();
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) return;
    
    books[bookIndex] = {
        ...books[bookIndex],
        title: document.getElementById('editBookTitle').value,
        author: document.getElementById('editBookAuthor').value,
        price: parseFloat(document.getElementById('editBookPrice').value),
        stock: parseInt(document.getElementById('editBookStock').value),
        category: document.getElementById('editBookCategory').value,
        rating: parseFloat(document.getElementById('editBookRating').value),
        description: document.getElementById('editBookDescription').value,
        image: document.getElementById('editBookImage').value
    };
    
    saveBooks(books);
    bootstrap.Modal.getInstance(document.getElementById('editBookModal')).hide();
    loadDashboardData();
    showAlert('Book updated successfully!', 'success');
}

function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    const books = getBooks();
    const filteredBooks = books.filter(book => book.id !== bookId);
    saveBooks(filteredBooks);
    
    loadDashboardData();
    showAlert('Book deleted successfully!', 'success');
}

function filterOrders(status) {
    loadOrdersTable(status);
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        order.status = newStatus;
        saveOrders(orders);
        loadOrdersTable();
        showAlert(`Order status updated to ${newStatus}`, 'success');
    }
}

function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    const orders = getOrders();
    const filteredOrders = orders.filter(order => order.id !== orderId);
    saveOrders(filteredOrders);
    
    loadDashboardData();
    showAlert('Order deleted successfully!', 'success');
}

function getStatusClass(status) {
    switch (status) {
        case 'pending': return 'bg-warning';
        case 'processing': return 'bg-info';
        case 'shipped': return 'bg-primary';
        case 'delivered': return 'bg-success';
        default: return 'bg-secondary';
    }
}

function getDemoUsers() {
    return [
        { id: '1', email: 'admin@bookstore.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
        { id: '2', email: 'customer@bookstore.com', name: 'John Customer', role: 'customer', createdAt: '2024-01-15' },
        { id: '3', email: 'jane@example.com', name: 'Jane Smith', role: 'customer', createdAt: '2024-02-01' }
    ];
}

function viewUserDetails(userId) {
    const user = getDemoUsers().find(u => u.id === userId);
    const orders = getOrders().filter(o => o.userId === userId);
    
    if (user) {
        showAlert(`User: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nTotal Orders: ${orders.length}`, 'info');
    }
}