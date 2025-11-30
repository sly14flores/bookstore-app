// Profile page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    checkUserAccess();
    loadProfileData();
    setupEventListeners();
    updateCartDisplay();
    updateUI();
});

function checkUserAccess() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showAlert('Please login to access your profile.', 'warning');
        setTimeout(() => {
            window.location.href = 'login.php';
        }, 2000);
        return;
    }
    
    // Update profile info
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent = currentUser.role;
    document.getElementById('userName').textContent = currentUser.name;
    
    // Show admin link if user is admin
    if (currentUser.role === 'admin') {
        document.getElementById('adminLink').style.display = 'block';
    }
}

function setupEventListeners() {
    document.getElementById('accountForm').addEventListener('submit', handleAccountUpdate);
    document.getElementById('addAddressForm').addEventListener('submit', handleAddAddress);
}

function loadProfileData() {
    const currentUser = getCurrentUser();
    const orders = getOrders().filter(order => order.userId === currentUser.id);
    const books = getBooks();
    
    // Calculate stats
    const totalOrders = orders.length;
    const totalBooks = orders.reduce((sum, order) => 
        sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Update stats
    document.getElementById('totalOrdersCount').textContent = totalOrders;
    document.getElementById('totalBooksCount').textContent = totalBooks;
    document.getElementById('totalSpentAmount').textContent = `$${totalSpent.toFixed(2)}`;
    
    // Load recent orders
    loadRecentOrders(orders.slice(-3).reverse());
    
    // Load order history
    loadOrderHistory(orders.reverse());
    
    // Load account settings
    loadAccountSettings();
    
    // Load addresses
    loadAddresses();
}

function loadRecentOrders(orders) {
    const container = document.getElementById('recentOrdersList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                <h5>No orders yet</h5>
                <p class="text-muted">Start shopping to see your orders here!</p>
                <a href="books.php" class="btn btn-primary">Browse Books</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    orders.forEach(order => {
        const orderElement = createOrderElement(order);
        container.appendChild(orderElement);
    });
}

function loadOrderHistory(orders) {
    const container = document.getElementById('orderHistoryList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-bag fa-4x text-muted mb-3"></i>
                <h4>No orders found</h4>
                <p class="text-muted mb-4">You haven't placed any orders yet. Start shopping to see your order history here!</p>
                <a href="books.php" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    orders.forEach(order => {
        const orderElement = createDetailedOrderElement(order);
        container.appendChild(orderElement);
    });
}

function createOrderElement(order) {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'border rounded p-3 mb-3';
    
    const statusClass = getOrderStatusClass(order.status);
    
    orderDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
                <h6 class="mb-1">Order #${order.id.slice(-6)}</h6>
                <small class="text-muted">
                    <i class="fas fa-calendar me-1"></i>
                    ${new Date(order.createdAt).toLocaleDateString()}
                </small>
            </div>
            <div class="text-end">
                <span class="badge ${statusClass}">${order.status}</span>
                <div class="fw-bold mt-1">$${order.total.toFixed(2)}</div>
            </div>
        </div>
        <div class="text-muted small">
            ${order.items.length} item${order.items.length > 1 ? 's' : ''}
        </div>
    `;
    
    return orderDiv;
}

function createDetailedOrderElement(order) {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'card mb-4';
    
    const books = getBooks();
    const statusClass = getOrderStatusClass(order.status);
    
    let itemsHtml = '';
    order.items.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book) {
            itemsHtml += `
                <div class="d-flex align-items-center mb-2">
                    <img src="${book.image}" alt="${book.title}" class="me-3" style="width: 50px; height: 60px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${book.title}</h6>
                        <small class="text-muted">${book.author}</small>
                        <div class="small">Qty: ${item.quantity} × $${book.price} = $${(book.price * item.quantity).toFixed(2)}</div>
                    </div>
                </div>
            `;
        }
    });
    
    orderDiv.innerHTML = `
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0">Order #${order.id.slice(-6)}</h6>
                    <small class="text-muted">
                        <i class="fas fa-calendar me-1"></i>
                        ${new Date(order.createdAt).toLocaleDateString()}
                    </small>
                </div>
                <div class="text-end">
                    <span class="badge ${statusClass}">${order.status}</span>
                    <div class="fw-bold mt-1">$${order.total.toFixed(2)}</div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <h6>Items Ordered</h6>
                    ${itemsHtml}
                </div>
                <div class="col-md-4">
                    <h6>Shipping Address</h6>
                    <address class="small">
                        ${order.customerInfo.firstName} ${order.customerInfo.lastName}<br>
                        ${order.customerInfo.address}<br>
                        ${order.customerInfo.city}, ${order.customerInfo.state} ${order.customerInfo.zipCode}
                    </address>
                    <button class="btn btn-outline-primary btn-sm" onclick="showOrderDetails('${order.id}')">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return orderDiv;
}

function loadAccountSettings() {
    const currentUser = getCurrentUser();
    
    document.getElementById('accountName').value = currentUser.name;
    document.getElementById('accountEmail').value = currentUser.email;
    
    // Load additional user data from localStorage if available
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    document.getElementById('accountPhone').value = userData.phone || '';
    document.getElementById('accountBirthdate').value = userData.birthdate || '';
}

function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
    const container = document.getElementById('addressesList');
    
    if (addresses.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-map-marker-alt fa-3x text-muted mb-3"></i>
                <h5>No saved addresses</h5>
                <p class="text-muted">Add an address to make checkout faster!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    addresses.forEach((address, index) => {
        const addressElement = createAddressElement(address, index);
        container.appendChild(addressElement);
    });
}

function createAddressElement(address, index) {
    const addressDiv = document.createElement('div');
    addressDiv.className = 'card mb-3';
    
    addressDiv.innerHTML = `
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="card-title">${address.title} ${address.isDefault ? '<span class="badge bg-primary">Default</span>' : ''}</h6>
                    <address class="mb-0">
                        ${address.firstName} ${address.lastName}<br>
                        ${address.street}<br>
                        ${address.city}, ${address.state} ${address.zip}
                    </address>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        Actions
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="editAddress(${index})">Edit</a></li>
                        <li><a class="dropdown-item" href="#" onclick="setDefaultAddress(${index})">Set as Default</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="deleteAddress(${index})">Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    return addressDiv;
}

function handleAccountUpdate(e) {
    e.preventDefault();
    
    const currentUser = getCurrentUser();
    const updatedUser = {
        ...currentUser,
        name: document.getElementById('accountName').value,
        email: document.getElementById('accountEmail').value
    };
    
    // Save additional user data
    const userData = {
        phone: document.getElementById('accountPhone').value,
        birthdate: document.getElementById('accountBirthdate').value
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    showAlert('Account updated successfully!', 'success');
    
    // Update profile display
    document.getElementById('profileName').textContent = updatedUser.name;
    document.getElementById('profileEmail').textContent = updatedUser.email;
    document.getElementById('userName').textContent = updatedUser.name;
}

function handleAddAddress(e) {
    e.preventDefault();
    
    const newAddress = {
        title: document.getElementById('addressTitle').value,
        firstName: document.getElementById('addressFirstName').value,
        lastName: document.getElementById('addressLastName').value,
        street: document.getElementById('addressStreet').value,
        city: document.getElementById('addressCity').value,
        state: document.getElementById('addressState').value,
        zip: document.getElementById('addressZip').value,
        isDefault: document.getElementById('setAsDefault').checked
    };
    
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
    
    // If setting as default, remove default from other addresses
    if (newAddress.isDefault) {
        addresses.forEach(addr => addr.isDefault = false);
    }
    
    addresses.push(newAddress);
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    bootstrap.Modal.getInstance(document.getElementById('addAddressModal')).hide();
    document.getElementById('addAddressForm').reset();
    loadAddresses();
    showAlert('Address added successfully!', 'success');
}

function saveAddress() {
    document.getElementById('addAddressForm').dispatchEvent(new Event('submit'));
}

function deleteAddress(index) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
    addresses.splice(index, 1);
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    loadAddresses();
    showAlert('Address deleted successfully!', 'success');
}

function setDefaultAddress(index) {
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
    addresses.forEach((addr, i) => addr.isDefault = i === index);
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    loadAddresses();
    showAlert('Default address updated!', 'success');
}

function filterOrders(status) {
    const currentUser = getCurrentUser();
    let orders = getOrders().filter(order => order.userId === currentUser.id);
    
    if (status !== 'all') {
        orders = orders.filter(order => order.status === status);
    }
    
    loadOrderHistory(orders.reverse());
}

function showOrderDetails(orderId) {
    const order = getOrders().find(o => o.id === orderId);
    if (!order) return;
    
    const books = getBooks();
    let itemsHtml = '';
    
    order.items.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book) {
            itemsHtml += `
                <tr>
                    <td><img src="${book.image}" alt="${book.title}" style="width: 40px; height: 50px; object-fit: cover;"></td>
                    <td>${book.title}<br><small class="text-muted">${book.author}</small></td>
                    <td>${item.quantity}</td>
                    <td>$${book.price}</td>
                    <td>$${(book.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        }
    });
    
    const statusClass = getOrderStatusClass(order.status);
    
    document.getElementById('orderDetailsContent').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Order Information</h6>
                <p><strong>Order ID:</strong> #${order.id.slice(-6)}</p>
                <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span class="badge ${statusClass}">${order.status}</span></p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            </div>
            <div class="col-md-6">
                <h6>Shipping Address</h6>
                <address>
                    ${order.customerInfo.firstName} ${order.customerInfo.lastName}<br>
                    ${order.customerInfo.address}<br>
                    ${order.customerInfo.city}, ${order.customerInfo.state} ${order.customerInfo.zipCode}
                </address>
            </div>
        </div>
        <hr>
        <h6>Order Items</h6>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Book</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
}

function getOrderStatusClass(status) {
    switch (status) {
        case 'pending': return 'bg-warning text-dark';
        case 'processing': return 'bg-info';
        case 'shipped': return 'bg-primary';
        case 'delivered': return 'bg-success';
        default: return 'bg-secondary';
    }
}