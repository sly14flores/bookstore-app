// Cart page JavaScript
let promoCodeApplied = false;
let promoDiscount = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadCartItems();
    updateCartSummary();
    loadRecentlyViewed();
    updateUI();
});

function loadCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cart = getCart();
    
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(emptyMessage);
        document.getElementById('checkoutBtn').disabled = true;
        return;
    }
    
    emptyMessage.style.display = 'none';
    container.innerHTML = '';
    
    const books = getBooks();
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (!book) return;
        
        const cartItem = createCartItemElement(book, item);
        container.appendChild(cartItem);
    });
    
    document.getElementById('checkoutBtn').disabled = false;
}

function createCartItemElement(book, item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item border rounded p-3 mb-3';
    cartItem.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-2">
                <img src="${book.image}" alt="${book.title}" class="img-fluid rounded">
            </div>
            <div class="col-md-4">
                <h6 class="mb-1">${book.title}</h6>
                <p class="text-muted small mb-1">${book.author}</p>
                <span class="category-badge">${book.category}</span>
            </div>
            <div class="col-md-2 text-center">
                <div class="fw-bold text-primary">$${book.price}</div>
            </div>
            <div class="col-md-3">
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${book.id}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-3 fw-bold">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${book.id}', ${item.quantity + 1})" ${item.quantity >= book.stock ? 'disabled' : ''}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="text-center mt-2">
                    <small class="text-muted">Max: ${book.stock}</small>
                </div>
            </div>
            <div class="col-md-1 text-end">
                <button class="btn btn-sm btn-outline-danger" onclick="confirmRemoveItem('${book.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-8 offset-md-2">
                <div class="text-end">
                    <strong>Subtotal: $${(book.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    `;
    
    return cartItem;
}

function updateCartSummary() {
    const cart = getCart();
    const books = getBooks();
    
    let subtotal = 0;
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book) {
            subtotal += book.price * item.quantity;
        }
    });
    
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const discount = promoCodeApplied ? subtotal * (promoDiscount / 100) : 0;
    const total = subtotal + tax + shipping - discount;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function confirmRemoveItem(bookId) {
    const book = getBooks().find(b => b.id === bookId);
    if (!book) return;
    
    document.getElementById('confirmRemove').onclick = () => {
        removeFromCart(bookId);
        bootstrap.Modal.getInstance(document.getElementById('removeConfirmModal')).hide();
        loadCartItems();
        updateCartSummary();
        showAlert(`"${book.title}" removed from cart`, 'info');
    };
    
    const modal = new bootstrap.Modal(document.getElementById('removeConfirmModal'));
    modal.show();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        saveCart([]);
        loadCartItems();
        updateCartSummary();
        showAlert('Cart cleared successfully', 'info');
    }
}

function applyPromoCode() {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();
    
    if (code === 'SAVE10') {
        if (!promoCodeApplied) {
            promoCodeApplied = true;
            promoDiscount = 10;
            updateCartSummary();
            showAlert('Promo code applied! 10% discount added.', 'success');
            document.getElementById('promoCode').disabled = true;
        } else {
            showAlert('Promo code already applied.', 'warning');
        }
    } else if (code === 'FREESHIP') {
        showAlert('Free shipping code applied!', 'success');
        // This would modify shipping calculation
    } else {
        showAlert('Invalid promo code.', 'danger');
    }
}

function loadRecentlyViewed() {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const container = document.getElementById('recentlyViewed');
    
    if (recentlyViewed.length === 0) {
        container.innerHTML = '<p class="text-muted">No recently viewed books</p>';
        return;
    }
    
    const books = getBooks();
    container.innerHTML = '';
    
    recentlyViewed.slice(0, 3).forEach(bookId => {
        const book = books.find(b => b.id === bookId);
        if (book) {
            const bookElement = document.createElement('div');
            bookElement.className = 'mb-3';
            bookElement.innerHTML = `
                <div class="d-flex">
                    <img src="${book.image}" alt="${book.title}" class="me-2" style="width: 40px; height: 50px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1 small">${book.title}</h6>
                        <p class="mb-1 small text-muted">${book.author}</p>
                        <p class="mb-0 small fw-bold text-primary">$${book.price}</p>
                    </div>
                </div>
            `;
            container.appendChild(bookElement);
        }
    });
}

// Update quantity function
function updateQuantity(bookId, newQuantity) {
    const book = getBooks().find(b => b.id === bookId);
    if (!book) return;
    
    if (newQuantity <= 0) {
        confirmRemoveItem(bookId);
        return;
    }
    
    if (newQuantity > book.stock) {
        showAlert('Cannot exceed available stock.', 'warning');
        return;
    }
    
    const cart = getCart();
    const item = cart.find(item => item.bookId === bookId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        loadCartItems();
        updateCartSummary();
    }
}

// Override the global updateCartDisplay function for this page
function updateCartDisplay() {
    updateCartSummary();
}