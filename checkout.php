<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookStore - Checkout</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold text-primary" href="home.php">
                <i class="fas fa-book me-2"></i>BookStore
            </a>
            
            <div class="d-flex align-items-center">
                <button class="btn btn-outline-primary me-2 position-relative" onclick="toggleCart()">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">0</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Checkout Progress -->
    <section class="bg-light py-3">
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="home.php">Home</a></li>
                            <li class="breadcrumb-item"><a href="cart.php">Cart</a></li>
                            <li class="breadcrumb-item active">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section>

    <!-- Checkout Steps -->
    <section class="py-4 bg-white border-bottom">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="checkout-steps">
                        <div class="step active">
                            <div class="step-number">1</div>
                            <div class="step-title">Shipping</div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-title">Payment</div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-title">Review</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Checkout Content -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <!-- Checkout Form -->
                    <form id="checkoutForm">
                        <!-- Step 1: Shipping Information -->
                        <div class="checkout-step" id="step1">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-shipping-fast me-2"></i>Shipping Information</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="firstName" class="form-label">First Name</label>
                                            <input type="text" class="form-control" id="firstName" required>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="lastName" class="form-label">Last Name</label>
                                            <input type="text" class="form-control" id="lastName" required>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="email" class="form-label">Email Address</label>
                                            <input type="email" class="form-control" id="email" required>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="phone" class="form-label">Phone Number</label>
                                            <input type="tel" class="form-control" id="phone" required>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="address" class="form-label">Street Address</label>
                                            <input type="text" class="form-control" id="address" required>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="city" class="form-label">City</label>
                                            <input type="text" class="form-control" id="city" required>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label for="state" class="form-label">State</label>
                                            <select class="form-select" id="state" required>
                                                <option value="">Select State</option>
                                                <option value="CA">California</option>
                                                <option value="NY">New York</option>
                                                <option value="TX">Texas</option>
                                                <option value="FL">Florida</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label for="zipCode" class="form-label">ZIP Code</label>
                                            <input type="text" class="form-control" id="zipCode" required>
                                        </div>
                                    </div>
                                    
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" id="saveAddress">
                                        <label class="form-check-label" for="saveAddress">
                                            Save this address for future orders
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Shipping Options -->
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-truck me-2"></i>Shipping Options</h5>
                                </div>
                                <div class="card-body">
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="shipping" id="standardShipping" value="standard" checked>
                                        <label class="form-check-label" for="standardShipping">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <strong>Standard Shipping</strong><br>
                                                    <small class="text-muted">5-7 business days</small>
                                                </div>
                                                <div><strong>$5.99</strong></div>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="shipping" id="expressShipping" value="express">
                                        <label class="form-check-label" for="expressShipping">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <strong>Express Shipping</strong><br>
                                                    <small class="text-muted">2-3 business days</small>
                                                </div>
                                                <div><strong>$12.99</strong></div>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="shipping" id="overnightShipping" value="overnight">
                                        <label class="form-check-label" for="overnightShipping">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <strong>Overnight Shipping</strong><br>
                                                    <small class="text-muted">Next business day</small>
                                                </div>
                                                <div><strong>$24.99</strong></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="btn btn-primary" onclick="nextStep(2)">
                                Continue to Payment <i class="fas fa-arrow-right ms-2"></i>
                            </button>
                        </div>

                        <!-- Step 2: Payment Information -->
                        <div class="checkout-step d-none" id="step2">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-credit-card me-2"></i>Payment Information</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <label for="cardholderName" class="form-label">Cardholder Name</label>
                                            <input type="text" class="form-control" id="cardholderName" required>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="cardNumber" class="form-label">Card Number</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                                                <span class="input-group-text">
                                                    <i class="fab fa-cc-visa"></i>
                                                    <i class="fab fa-cc-mastercard ms-1"></i>
                                                    <i class="fab fa-cc-amex ms-1"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="expiryDate" class="form-label">Expiry Date</label>
                                            <input type="text" class="form-control" id="expiryDate" placeholder="MM/YY" required>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="cvv" class="form-label">CVV</label>
                                            <input type="text" class="form-control" id="cvv" placeholder="123" required>
                                        </div>
                                    </div>
                                    
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" id="billingAddressSame" checked>
                                        <label class="form-check-label" for="billingAddressSame">
                                            Billing address is the same as shipping address
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary" onclick="prevStep(1)">
                                    <i class="fas fa-arrow-left me-2"></i>Back to Shipping
                                </button>
                                <button type="button" class="btn btn-primary" onclick="nextStep(3)">
                                    Review Order <i class="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Step 3: Order Review -->
                        <div class="checkout-step d-none" id="step3">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0"><i class="fas fa-clipboard-check me-2"></i>Order Review</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h6>Shipping Address</h6>
                                            <div id="shippingAddressReview"></div>
                                        </div>
                                        <div class="col-md-6">
                                            <h6>Payment Method</h6>
                                            <div id="paymentMethodReview"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary" onclick="prevStep(2)">
                                    <i class="fas fa-arrow-left me-2"></i>Back to Payment
                                </button>
                                <button type="submit" class="btn btn-success btn-lg">
                                    <i class="fas fa-lock me-2"></i>Place Order
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="col-lg-4">
                    <!-- Order Summary -->
                    <div class="card sticky-top">
                        <div class="card-header">
                            <h5 class="mb-0">Order Summary</h5>
                        </div>
                        <div class="card-body">
                            <div id="orderItems">
                                <!-- Order items will be loaded here -->
                            </div>
                            
                            <hr>
                            
                            <div class="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span id="subtotal">$0.00</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Shipping:</span>
                                <span id="shippingCost">$5.99</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Tax:</span>
                                <span id="tax">$0.00</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between fw-bold h5">
                                <span>Total:</span>
                                <span id="total">$0.00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Security Info -->
                    <div class="card mt-4">
                        <div class="card-body text-center">
                            <i class="fas fa-shield-alt fa-2x text-success mb-2"></i>
                            <h6>Secure Checkout</h6>
                            <small class="text-muted">Your payment information is encrypted and secure</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center py-5">
                    <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
                    <h3>Order Placed Successfully!</h3>
                    <p class="text-muted mb-4">Thank you for your purchase. You will receive a confirmation email shortly.</p>
                    <div class="mb-3">
                        <strong>Order Number: #<span id="orderNumber"></span></strong>
                    </div>
                    <div class="d-flex justify-content-center gap-2">
                        <a href="home.php" class="btn btn-primary">Continue Shopping</a>
                        <a href="profile.php" class="btn btn-outline-primary">View Orders</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5><i class="fas fa-book me-2"></i>BookStore</h5>
                    <p>Your trusted online bookstore for all genres.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p>&copy; 2024 BookStore. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="shared.js"></script>
    <script src="checkout.js"></script>
</body>
</html>