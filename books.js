// Books page JavaScript
let currentPage = 1;
let booksPerPage = 12;
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    loadBooksFromURL();
    updateCartDisplay();
    updateUI();
});

function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterBooks);
    document.getElementById('categoryFilter').addEventListener('change', filterBooks);
    document.getElementById('sortFilter').addEventListener('change', filterBooks);
    document.getElementById('gridView').addEventListener('click', () => setView('grid'));
    document.getElementById('listView').addEventListener('click', () => setView('list'));
}

function loadBooksFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        document.getElementById('categoryFilter').value = category;
    }
    
    filterBooks();
}

function filterBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    
    let books = getBooks();
    
    // Filter by search term
    if (searchTerm) {
        books = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by category
    if (category) {
        books = books.filter(book => book.category === category);
    }
    
    // Sort books
    switch (sortBy) {
        case 'price-low':
            books.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            books.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            books.sort((a, b) => b.rating - a.rating);
            break;
        case 'title':
            books.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    filteredBooks = books;
    currentPage = 1;
    displayBooks();
    updateResultsCount();
    setupPagination();
}

function displayBooks() {
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
    
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);
    
    booksToShow.forEach(book => {
        const bookElement = currentView === 'grid' ? createBookCard(book) : createBookListItem(book);
        container.appendChild(bookElement);
    });
}

function createBookCard(book) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    const stars = generateStars(book.rating);
    const inStock = book.stock > 0;
    
    col.innerHTML = `
        <div class="card book-card h-100">
            <div class="book-cover">
                <img src="${book.image}" alt="${book.title}" class="card-img-top">
            </div>
            <div class="card-body d-flex flex-column">
                <span class="category-badge mb-2">${book.category}</span>
                <h5 class="book-title">${book.title}</h5>
                <p class="book-author text-muted">${book.author}</p>
                <div class="rating mb-2">${stars} <small>(${book.rating})</small></div>
                <p class="card-text text-muted small">${book.description.substring(0, 100)}...</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="book-price">$${book.price}</span>
                        <small class="text-muted">${inStock ? `${book.stock} in stock` : 'Out of stock'}</small>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary btn-sm flex-fill" onclick="showBookDetails('${book.id}')">
                            <i class="fas fa-eye me-1"></i>Details
                        </button>
                        <button class="btn btn-primary btn-sm flex-fill ${!inStock ? 'disabled' : ''}" 
                                onclick="addToCart('${book.id}')" ${!inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart me-1"></i>
                            ${inStock ? 'Add' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function createBookListItem(book) {
    const col = document.createElement('div');
    col.className = 'col-12 mb-3';
    
    const stars = generateStars(book.rating);
    const inStock = book.stock > 0;
    
    col.innerHTML = `
        <div class="card book-card">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${book.image}" alt="${book.title}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-7">
                        <span class="category-badge mb-2">${book.category}</span>
                        <h5 class="book-title">${book.title}</h5>
                        <p class="book-author text-muted">${book.author}</p>
                        <div class="rating mb-2">${stars} <small>(${book.rating})</small></div>
                        <p class="card-text text-muted">${book.description}</p>
                    </div>
                    <div class="col-md-3 text-end">
                        <div class="book-price mb-2">$${book.price}</div>
                        <small class="text-muted d-block mb-2">${inStock ? `${book.stock} in stock` : 'Out of stock'}</small>
                        <div class="d-flex flex-column gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="showBookDetails('${book.id}')">
                                <i class="fas fa-eye me-1"></i>View Details
                            </button>
                            <button class="btn btn-primary btn-sm ${!inStock ? 'disabled' : ''}" 
                                    onclick="addToCart('${book.id}')" ${!inStock ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart me-1"></i>
                                ${inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function setView(view) {
    currentView = view;
    
    // Update button states
    document.getElementById('gridView').classList.toggle('active', view === 'grid');
    document.getElementById('listView').classList.toggle('active', view === 'list');
    
    displayBooks();
}

function updateResultsCount() {
    const count = filteredBooks.length;
    document.getElementById('resultsCount').textContent = `${count} book${count !== 1 ? 's' : ''} found`;
}

function setupPagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
    paginationContainer.appendChild(prevLi);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        paginationContainer.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
    paginationContainer.appendChild(nextLi);
}

function changePage(page) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayBooks();
    setupPagination();
    window.scrollTo(0, 0);
}

function showBookDetails(bookId) {
    const book = getBooks().find(b => b.id === bookId);
    if (!book) return;
    
    const stars = generateStars(book.rating);
    
    document.getElementById('bookDetailTitle').textContent = book.title;
    document.getElementById('bookDetailContent').innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${book.image}" alt="${book.title}" class="img-fluid rounded">
            </div>
            <div class="col-md-8">
                <span class="category-badge mb-2">${book.category}</span>
                <h4>${book.title}</h4>
                <p class="text-muted">by ${book.author}</p>
                <div class="rating mb-3">${stars} <small>(${book.rating})</small></div>
                <p>${book.description}</p>
                <div class="mb-3">
                    <strong>Price: <span class="text-primary">$${book.price}</span></strong>
                </div>
                <div class="mb-3">
                    <strong>Stock: <span class="${book.stock > 0 ? 'text-success' : 'text-danger'}">${book.stock > 0 ? `${book.stock} available` : 'Out of stock'}</span></strong>
                </div>
            </div>
        </div>
    `;
    
    const addToCartBtn = document.getElementById('addToCartFromModal');
    addToCartBtn.disabled = book.stock === 0;
    addToCartBtn.onclick = () => {
        addToCart(bookId);
        bootstrap.Modal.getInstance(document.getElementById('bookDetailModal')).hide();
    };
    
    const modal = new bootstrap.Modal(document.getElementById('bookDetailModal'));
    modal.show();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('sortFilter').value = '';
    filterBooks();
}