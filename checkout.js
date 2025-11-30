// Checkout page JavaScript
let currentStep = 1;
let orderData = {};

document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    checkCartAndRedirect();
    loadOrderSummary();
    setupEventListeners();
    updateCartDisplay();
    updateUI();
});

function checkCartAndRedirect() {
    const cart = getCart();
    if (cart.length === 0) {
        showAlert('Your cart is empty. Redirecting to books page...', 'warning');
        setTimeout(() => {
            window.location.href = 'books.php';
        }, 2000);
        return;
    }
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showAlert('Please login to continue with checkout.', 'warning');
        setTimeout(() => {
            window.location.href = 'login.php';
        }, 2000);
        return;
    }
}

function setupEventListeners() {
    document.getElementById('checkoutForm').addEventListener('submit', handleOrderSubmit);
    
    // Shipping option change
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateShippingCost);
    });
    
    // Pre-fill user information
    const currentUser = getCurrentUser();
    if (currentUser) {
        document.getElementById('email').value = currentUser.email;
        const nameParts = currentUser.name.split(' ');
        document.getElementById('firstName').value = nameParts[0] || '';
        document.getElementById('lastName').value = nameParts.slice(1).join(' ') || '';
    }
}

function loadOrderSummary() {
    const cart = getCart();
    const books = getBooks();
    const container = document.getElementById('orderItems');
    
    container.innerHTML = '';
    
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (!book) return;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'd-flex justify-content-between align-items-center mb-2';
        orderItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${book.image}" alt="${book.title}" class="me-2" style="width: 40px; height: 50px; object-fit: cover;">
                <div>
                    <h6 class="mb-0 small">${book.title}</h6>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
            </div>
            <span class="fw-bold">$${(book.price * item.quantity).toFixed(2)}</span>
        `;
        container.appendChild(orderItem);
    });
    
    updateOrderTotals();
}

function updateOrderTotals() {
    const cart = getCart();
    const books = getBooks();
    
    let subtotal = 0;
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book) {
            subtotal += book.price * item.quantity;
        }
    });
    
    const shippingCost = getShippingCost();
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function getShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) return 5.99;
    
    switch (selectedShipping.value) {
        case 'standard': return 5.99;
        case 'express': return 12.99;
        case 'overnight': return 24.99;
        default: return 5.99;
    }
}

function updateShippingCost() {
    updateOrderTotals();
}

function nextStep(step) {
    if (!validateCurrentStep()) return;
    
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.add('d-none');
    
    // Show next step
    document.getElementById(`step${step}`).classList.remove('d-none');
    
    // Update step indicators
    updateStepIndicators(step);
    
    // If moving to review step, populate review data
    if (step === 3) {
        populateReviewStep();
    }
    
    currentStep = step;
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`step${currentStep}`).classList.add('d-none');
    
    // Show previous step
    document.getElementById(`step${step}`).classList.remove('d-none');
    
    // Update step indicators
    updateStepIndicators(step);
    
    currentStep = step;
}

function updateStepIndicators(activeStep) {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateShippingInfo();
        case 2:
            return validatePaymentInfo();
        default:
            return true;
    }
}

function validateShippingInfo() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showAlert(`Please fill in ${field.labels[0].textContent}`, 'danger');
            field.focus();
            return false;
        }
    }
    
    return true;
}

function validatePaymentInfo() {
    const requiredFields = ['cardholderName', 'cardNumber', 'expiryDate', 'cvv'];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showAlert(`Please fill in ${field.labels[0].textContent}`, 'danger');
            field.focus();
            return false;
        }
    }
    
    // Basic card number validation
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        showAlert('Please enter a valid card number', 'danger');
        return false;
    }
    
    return true;
}

function populateReviewStep() {
    // Populate shipping address
    const shippingAddress = `
        ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}<br>
        ${document.getElementById('address').value}<br>
        ${document.getElementById('city').value}, ${document.getElementById('state').value} ${document.getElementById('zipCode').value}<br>
        ${document.getElementById('phone').value}
    `;
    document.getElementById('shippingAddressReview').innerHTML = shippingAddress;
    
    // Populate payment method
    const cardNumber = document.getElementById('cardNumber').value;
    const maskedCard = '**** **** **** ' + cardNumber.slice(-4);
    const paymentMethod = `
        ${document.getElementById('cardholderName').value}<br>
        ${maskedCard}<br>
        Expires: ${document.getElementById('expiryDate').value}
    `;
    document.getElementById('paymentMethodReview').innerHTML = paymentMethod;
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) return;
    
    // Collect order data
    const cart = getCart();
    const currentUser = getCurrentUser();
    const books = getBooks();
    
    const orderData = {
        id: Date.now().toString(),
        userId: currentUser.id,
        items: cart,
        total: parseFloat(document.getElementById('total').textContent.replace('$', '')),
        customerInfo: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value
        },
        shippingMethod: document.querySelector('input[name="shipping"]:checked').value,
        paymentInfo: {
            cardholderName: document.getElementById('cardholderName').value,
            cardNumber: document.getElementById('cardNumber').value.slice(-4), // Only store last 4 digits
            expiryDate: document.getElementById('expiryDate').value
        },
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Update book stock
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (book && book.stock >= item.quantity) {
            book.stock -= item.quantity;
        }
    });
    
    // Save order and update storage
    const orders = getOrders();
    orders.push(orderData);
    saveOrders(orders);
    saveBooks(books);
    
    // Clear cart
    saveCart([]);
    
    // Show success modal
    document.getElementById('orderNumber').textContent = orderData.id.slice(-6);
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
});