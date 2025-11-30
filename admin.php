<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookStore - Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold text-primary" href="home.php">
                <i class="fas fa-book me-2"></i>BookStore Admin
            </a>
            
            <div class="d-flex align-items-center">
                <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user-circle me-2"></i><span id="adminName">Admin</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="profile.php"><i class="fas fa-user me-2"></i>Profile</a></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#dashboard" data-bs-toggle="tab">
                                <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#books" data-bs-toggle="tab">
                                <i class="fas fa-book me-2"></i>Books
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#orders" data-bs-toggle="tab">
                                <i class="fas fa-shopping-cart me-2"></i>Orders
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#users" data-bs-toggle="tab">
                                <i class="fas fa-users me-2"></i>Users
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#analytics" data-bs-toggle="tab">
                                <i class="fas fa-chart-bar me-2"></i>Analytics
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="tab-content">
                    <!-- Dashboard Tab -->
                    <div class="tab-pane fade show active" id="dashboard">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Dashboard</h1>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <button type="button" class="btn btn-sm btn-outline-secondary">
                                    <i class="fas fa-download me-1"></i>Export
                                </button>
                            </div>
                        </div>

                        <!-- Stats Cards -->
                        <div class="row mb-4">
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Books</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalBooksCount">0</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-book fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-success shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Orders</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalOrdersCount">0</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-shopping-cart fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-info shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Users</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalUsersCount">0</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-users fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Revenue</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalRevenue">$0</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Activity -->
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Recent Orders</h6>
                                    </div>
                                    <div class="card-body">
                                        <div id="recentOrders">
                                            <!-- Recent orders will be loaded here -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Low Stock Alert</h6>
                                    </div>
                                    <div class="card-body">
                                        <div id="lowStockBooks">
                                            <!-- Low stock books will be loaded here -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Books Tab -->
                    <div class="tab-pane fade" id="books">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Books Management</h1>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addBookModal">
                                <i class="fas fa-plus me-1"></i>Add Book
                            </button>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Cover</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="booksTableBody">
                                    <!-- Books will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Orders Tab -->
                    <div class="tab-pane fade" id="orders">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Orders Management</h1>
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                                    Filter by Status
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="filterOrders('all')">All Orders</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="filterOrders('pending')">Pending</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="filterOrders('processing')">Processing</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="filterOrders('shipped')">Shipped</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="filterOrders('delivered')">Delivered</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="ordersTableBody">
                                    <!-- Orders will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Users Tab -->
                    <div class="tab-pane fade" id="users">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Users Management</h1>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Orders</th>
                                        <th>Total Spent</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="usersTableBody">
                                    <!-- Users will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Analytics Tab -->
                    <div class="tab-pane fade" id="analytics">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Analytics</h1>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Sales by Category</h6>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="categoryChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Monthly Revenue</h6>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="revenueChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Add Book Modal -->
    <div class="modal fade" id="addBookModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Book</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="addBookForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="bookTitle" class="form-label">Title</label>
                                <input type="text" class="form-control" id="bookTitle" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="bookAuthor" class="form-label">Author</label>
                                <input type="text" class="form-control" id="bookAuthor" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="bookPrice" class="form-label">Price</label>
                                <input type="number" step="0.01" class="form-control" id="bookPrice" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="bookStock" class="form-label">Stock</label>
                                <input type="number" class="form-control" id="bookStock" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="bookCategory" class="form-label">Category</label>
                                <select class="form-select" id="bookCategory" required>
                                    <option value="">Select Category</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Mystery">Mystery</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="bookRating" class="form-label">Rating</label>
                                <input type="number" step="0.1" min="0" max="5" class="form-control" id="bookRating" required>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="bookDescription" class="form-label">Description</label>
                                <textarea class="form-control" id="bookDescription" rows="3" required></textarea>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="bookImage" class="form-label">Image URL</label>
                                <input type="url" class="form-control" id="bookImage" placeholder="/images/photo1764505170.jpg">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveBook()">Add Book</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Book Modal -->
    <div class="modal fade" id="editBookModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Book</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editBookForm">
                        <input type="hidden" id="editBookId">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="editBookTitle" class="form-label">Title</label>
                                <input type="text" class="form-control" id="editBookTitle" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="editBookAuthor" class="form-label">Author</label>
                                <input type="text" class="form-control" id="editBookAuthor" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="editBookPrice" class="form-label">Price</label>
                                <input type="number" step="0.01" class="form-control" id="editBookPrice" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="editBookStock" class="form-label">Stock</label>
                                <input type="number" class="form-control" id="editBookStock" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="editBookCategory" class="form-label">Category</label>
                                <select class="form-select" id="editBookCategory" required>
                                    <option value="">Select Category</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Science Fiction">Science Fiction</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Mystery">Mystery</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="editBookRating" class="form-label">Rating</label>
                                <input type="number" step="0.1" min="0" max="5" class="form-control" id="editBookRating" required>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="editBookDescription" class="form-label">Description</label>
                                <textarea class="form-control" id="editBookDescription" rows="3" required></textarea>
                            </div>
                            <div class="col-12 mb-3">
                                <label for="editBookImage" class="form-label">Image URL</label>
                                <input type="url" class="form-control" id="editBookImage" placeholder="/images/photo1764505170.jpg">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="updateBook()">Update Book</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="shared.js"></script>
    <script src="admin.js"></script>
</body>
</html>