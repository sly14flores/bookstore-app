<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookStore - Shopping Cart</title>
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
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="home.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="books.php">Books</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="admin.php" id="adminLink" style="display: none;">Admin</a>
                    </li>
                </ul>
                
                <div class="d-flex align-items-center">
                    <a href="cart.php" class="btn btn-outline-primary me-2 position-relative active">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">0</span>
                    </a>
                    <button class="btn btn-primary" onclick="toggleLogin()" id="loginBtn">Login</button>
                    <div id="userInfo" class="d-none">
                        <span class="me-2">Hello, <span id="userName"></span></span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="logout()">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <section class="bg-light py-4">
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="home.php">Home</a></li>
                            <li class="breadcrumb-item active">Shopping Cart</li>
                        </ol>
                    </nav>
                    <h1 class="display-6 fw-bold mt-2">Shopping Cart</h1>
                </div>
            </div>
        </div>
    </section>

    <!-- Cart Content -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <!-- Cart Items -->
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">Cart Items</h5>
                                <button class="btn btn-outline-danger btn-sm" onclick="clearCart()">
                                    <i class="fas fa-trash me-1"></i>Clear Cart
                                </button>
                            </div>
                        </div>
                        <div class="card-body" id="cartItemsContainer">
                            <!-- Cart items will be loaded here -->
                            <div class="text-center py-5" id="emptyCartMessage">
                                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                                <h4>Your cart is empty</h4>
                                <p class="text-muted mb-4">Add some books to get started!</p>
                                <a href="books.php" class="btn btn-primary">Browse Books</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <!-- Order Summary -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">Order Summary</h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span id="subtotal">$0.00</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Tax (8%):</span>
                                <span id="tax">$0.00</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Shipping:</span>
                                <span id="shipping">$0.00</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between fw-bold">
                                <span>Total:</span>
                                <span id="total">$0.00</span>
                            </div>
                            
                            <div class="mt-4">
                                <a href="checkout.php" class="btn btn-success w-100 mb-2" id="checkoutBtn" disabled>
                                    <i class="fas fa-credit-card me-2"></i>Proceed to Checkout
                                </a>
                                <a href="books.php" class="btn btn-outline-primary w-100">
                                    <i class="fas fa-arrow-left me-2"></i>Continue Shopping
                                </a>
                            </div>
                            
                            <div class="mt-3">
                                <small class="text-muted">
                                    <i class="fas fa-shipping-fast me-1"></i>
                                    Free shipping on orders over $50
                                </small>
                            </div>
                        </div>
                    </div>

                    <!-- Promo Code -->
                    <div class="card mt-4">
                        <div class="card-header">
                            <h6 class="mb-0">Promo Code</h6>
                        </div>
                        <div class="card-body">
                            <div class="input-group">
                                <input type="text" class="form-control" id="promoCode" placeholder="Enter promo code">
                                <button class="btn btn-outline-secondary" onclick="applyPromoCode()">Apply</button>
                            </div>
                            <small class="text-muted mt-2 d-block">Try: SAVE10 for 10% off</small>
                        </div>
                    </div>

                    <!-- Recently Viewed -->
                    <div class="card mt-4">
                        <div class="card-header">
                            <h6 class="mb-0">Recently Viewed</h6>
                        </div>
                        <div class="card-body" id="recentlyViewed">
                            <!-- Recently viewed books will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Remove Confirmation Modal -->
    <div class="modal fade" id="removeConfirmModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Remove Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to remove this item from your cart?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmRemove">Remove</button>
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
    <script src="cart.js"></script>
</body>
</html>