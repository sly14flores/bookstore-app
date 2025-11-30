<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookStore - Profile</title>
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
                    <button class="btn btn-outline-primary me-2 position-relative" onclick="toggleCart()">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">0</span>
                    </button>
                    <div id="userInfo">
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
                            <li class="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                    <h1 class="display-6 fw-bold mt-2">My Profile</h1>
                </div>
            </div>
        </div>
    </section>

    <!-- Profile Content -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <!-- Profile Sidebar -->
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="profile-avatar mb-3">
                                <i class="fas fa-user-circle fa-5x text-primary"></i>
                            </div>
                            <h5 id="profileName">User Name</h5>
                            <p class="text-muted" id="profileEmail">user@email.com</p>
                            <span class="badge bg-primary" id="profileRole">Customer</span>
                        </div>
                    </div>

                    <!-- Profile Navigation -->
                    <div class="card mt-4">
                        <div class="card-body p-0">
                            <div class="list-group list-group-flush">
                                <a href="#overview" class="list-group-item list-group-item-action active" data-bs-toggle="tab">
                                    <i class="fas fa-tachometer-alt me-2"></i>Overview
                                </a>
                                <a href="#orders" class="list-group-item list-group-item-action" data-bs-toggle="tab">
                                    <i class="fas fa-shopping-bag me-2"></i>Order History
                                </a>
                                <a href="#account" class="list-group-item list-group-item-action" data-bs-toggle="tab">
                                    <i class="fas fa-user-cog me-2"></i>Account Settings
                                </a>
                                <a href="#addresses" class="list-group-item list-group-item-action" data-bs-toggle="tab">
                                    <i class="fas fa-map-marker-alt me-2"></i>Addresses
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9">
                    <div class="tab-content">
                        <!-- Overview Tab -->
                        <div class="tab-pane fade show active" id="overview">
                            <!-- Stats Cards -->
                            <div class="row mb-4">
                                <div class="col-md-4 mb-3">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <i class="fas fa-shopping-cart fa-2x text-primary mb-2"></i>
                                            <h4 id="totalOrdersCount">0</h4>
                                            <p class="text-muted mb-0">Total Orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <i class="fas fa-book fa-2x text-success mb-2"></i>
                                            <h4 id="totalBooksCount">0</h4>
                                            <p class="text-muted mb-0">Books Purchased</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card text-center">
                                        <div class="card-body">
                                            <i class="fas fa-dollar-sign fa-2x text-warning mb-2"></i>
                                            <h4 id="totalSpentAmount">$0</h4>
                                            <p class="text-muted mb-0">Total Spent</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Recent Orders -->
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="mb-0">Recent Orders</h5>
                                </div>
                                <div class="card-body">
                                    <div id="recentOrdersList">
                                        <!-- Recent orders will be loaded here -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Orders Tab -->
                        <div class="tab-pane fade" id="orders">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">Order History</h5>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-outline-secondary dropdown-toggle btn-sm" data-bs-toggle="dropdown">
                                                Filter
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#" onclick="filterOrders('all')">All Orders</a></li>
                                                <li><a class="dropdown-item" href="#" onclick="filterOrders('pending')">Pending</a></li>
                                                <li><a class="dropdown-item" href="#" onclick="filterOrders('delivered')">Delivered</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="orderHistoryList">
                                        <!-- Order history will be loaded here -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Account Settings Tab -->
                        <div class="tab-pane fade" id="account">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="mb-0">Account Settings</h5>
                                </div>
                                <div class="card-body">
                                    <form id="accountForm">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="accountName" class="form-label">Full Name</label>
                                                <input type="text" class="form-control" id="accountName">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="accountEmail" class="form-label">Email Address</label>
                                                <input type="email" class="form-control" id="accountEmail">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="accountPhone" class="form-label">Phone Number</label>
                                                <input type="tel" class="form-control" id="accountPhone">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="accountBirthdate" class="form-label">Birth Date</label>
                                                <input type="date" class="form-control" id="accountBirthdate">
                                            </div>
                                        </div>
                                        
                                        <hr>
                                        
                                        <h6>Change Password</h6>
                                        <div class="row">
                                            <div class="col-md-4 mb-3">
                                                <label for="currentPassword" class="form-label">Current Password</label>
                                                <input type="password" class="form-control" id="currentPassword">
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label for="newPassword" class="form-label">New Password</label>
                                                <input type="password" class="form-control" id="newPassword">
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
                                                <input type="password" class="form-control" id="confirmNewPassword">
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex justify-content-end">
                                            <button type="submit" class="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!-- Addresses Tab -->
                        <div class="tab-pane fade" id="addresses">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">Saved Addresses</h5>
                                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addAddressModal">
                                            <i class="fas fa-plus me-1"></i>Add Address
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="addressesList">
                                        <!-- Saved addresses will be loaded here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Add Address Modal -->
    <div class="modal fade" id="addAddressModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Address</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="addAddressForm">
                        <div class="mb-3">
                            <label for="addressTitle" class="form-label">Address Title</label>
                            <input type="text" class="form-control" id="addressTitle" placeholder="e.g., Home, Office">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="addressFirstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="addressFirstName">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="addressLastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="addressLastName">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="addressStreet" class="form-label">Street Address</label>
                            <input type="text" class="form-control" id="addressStreet">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="addressCity" class="form-label">City</label>
                                <input type="text" class="form-control" id="addressCity">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="addressState" class="form-label">State</label>
                                <input type="text" class="form-control" id="addressState">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="addressZip" class="form-label">ZIP Code</label>
                                <input type="text" class="form-control" id="addressZip">
                            </div>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="setAsDefault">
                            <label class="form-check-label" for="setAsDefault">
                                Set as default address
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveAddress()">Save Address</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Details Modal -->
    <div class="modal fade" id="orderDetailsModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Order Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="orderDetailsContent">
                    <!-- Order details will be loaded here -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    <script src="profile.js"></script>
</body>
</html>