<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookStore - Online Bookstore Marketplace</title>
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
                        <a class="nav-link active" href="home.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="books.php">Books</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="admin.php" id="adminLink" style="display: none;">Admin</a>
                    </li>
                </ul>
                
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-primary me-2 position-relative" onclick="toggleCart()">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">0</span>
                    </button>
                    <button class="btn btn-primary" onclick="toggleLogin()" id="loginBtn">Login</button>
                    <div id="userInfo" class="d-none">
                        <span class="me-2">Hello, <span id="userName"></span></span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="logout()">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section bg-gradient-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold mb-4">Welcome to BookStore</h1>
                    <p class="lead mb-4">Discover your next favorite book from our curated collection</p>
                    <div class="row text-center">
                        <div class="col-4">
                            <h3 class="fw-bold" id="totalBooks">8</h3>
                            <small>Books Available</small>
                        </div>
                        <div class="col-4">
                            <h3 class="fw-bold">5</h3>
                            <small>Categories</small>
                        </div>
                        <div class="col-4">
                            <h3 class="fw-bold">4.3</h3>
                            <small>Avg Rating</small>
                        </div>
                    </div>
                    <div class="mt-4">
                        <a href="books.php" class="btn btn-light btn-lg me-3">Browse Books</a>
                        <a href="#featured" class="btn btn-outline-light btn-lg">Featured Books</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="https://via.placeholder.com/500x300/4f46e5/ffffff?text=BookStore" alt="BookStore" class="img-fluid rounded">
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Books Section -->
    <section id="featured" class="py-5">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="display-5 fw-bold">Featured Books</h2>
                <p class="lead text-muted">Discover our most popular and highly-rated books</p>
            </div>
            
            <div class="row" id="featuredBooks">
                <!-- Featured books will be loaded here -->
            </div>
            
            <div class="text-center mt-5">
                <a href="books.php" class="btn btn-primary btn-lg">View All Books</a>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="display-5 fw-bold">Browse by Category</h2>
                <p class="lead text-muted">Find books in your favorite genres</p>
            </div>
            
            <div class="row">
                <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                    <div class="card category-card text-center h-100">
                        <div class="card-body">
                            <i class="fas fa-book-open fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Fiction</h5>
                            <a href="books.php?category=Fiction" class="btn btn-outline-primary btn-sm">Browse</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                    <div class="card category-card text-center h-100">
                        <div class="card-body">
                            <i class="fas fa-rocket fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Sci-Fi</h5>
                            <a href="books.php?category=Science Fiction" class="btn btn-outline-primary btn-sm">Browse</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                    <div class="card category-card text-center h-100">
                        <div class="card-body">
                            <i class="fas fa-magic fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Fantasy</h5>
                            <a href="books.php?category=Fantasy" class="btn btn-outline-primary btn-sm">Browse</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                    <div class="card category-card text-center h-100">
                        <div class="card-body">
                            <i class="fas fa-heart fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Romance</h5>
                            <a href="books.php?category=Romance" class="btn btn-outline-primary btn-sm">Browse</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                    <div class="card category-card text-center h-100">
                        <div class="card-body">
                            <i class="fas fa-search fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Mystery</h5>
                            <a href="books.php?category=Mystery" class="btn btn-outline-primary btn-sm">Browse</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                    <div class="card category-card text-center h-100">
                        <div class="card-body">
                            <i class="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                            <h5 class="card-title">Non-Fiction</h5>
                            <a href="books.php?category=Non-Fiction" class="btn btn-outline-primary btn-sm">Browse</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Shopping Cart Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Shopping Cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <div class="text-center py-4" id="emptyCart">
                            <i class="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                            <h5>Your cart is empty</h5>
                            <p class="text-muted">Add some books to get started!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="w-100">
                        <div class="d-flex justify-content-between mb-3">
                            <strong>Total: $<span id="cartTotal">0.00</span></strong>
                        </div>
                        <button type="button" class="btn btn-primary w-100" onclick="checkout()" id="checkoutBtn" disabled>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5><i class="fas fa-book me-2"></i>BookStore</h5>
                    <p>Your trusted online bookstore for all genres. Discover, explore, and enjoy the world of books.</p>
                    <div class="social-links">
                        <a href="#" class="text-white me-3"><i class="fab fa-facebook fa-lg"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-twitter fa-lg"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-instagram fa-lg"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6>Quick Links</h6>
                    <ul class="list-unstyled">
                        <li><a href="home.php" class="text-white-50">Home</a></li>
                        <li><a href="books.php" class="text-white-50">Books</a></li>
                        <li><a href="cart.php" class="text-white-50">Cart</a></li>
                        <li><a href="login.php" class="text-white-50">Login</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h6>Categories</h6>
                    <ul class="list-unstyled">
                        <li><a href="books.php?category=Fiction" class="text-white-50">Fiction</a></li>
                        <li><a href="books.php?category=Science Fiction" class="text-white-50">Sci-Fi</a></li>
                        <li><a href="books.php?category=Fantasy" class="text-white-50">Fantasy</a></li>
                        <li><a href="books.php?category=Romance" class="text-white-50">Romance</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 mb-4">
                    <h6>Contact Info</h6>
                    <p class="mb-1"><i class="fas fa-envelope me-2"></i>info@bookstore.com</p>
                    <p class="mb-1"><i class="fas fa-phone me-2"></i>+1 (555) 123-4567</p>
                    <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>123 Book Street, Reading City</p>
                </div>
            </div>
            <hr class="my-4">
            <div class="text-center">
                <p>&copy; 2024 BookStore. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="shared.js"></script>
    <script src="home.js"></script>
</body>
</html>