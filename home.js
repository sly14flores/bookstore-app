// Home page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadFeaturedBooks();
    updateCartDisplay();
    updateUI();
});

// Load featured books (top rated books)
function loadFeaturedBooks() {
    const books = getBooks();
    const featuredBooks = books
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    
    const container = document.getElementById('featuredBooks');
    container.innerHTML = '';
    
    featuredBooks.forEach(book => {
        const bookCard = createFeaturedBookCard(book);
        container.appendChild(bookCard);
    });
}

// Create featured book card
function createFeaturedBookCard(book) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-6 mb-4';
    
    const stars = generateStars(book.rating);
    
    col.innerHTML = `
        <div class="card book-card h-100">
            <div class="book-cover">
                <img src="${book.image}" alt="${book.title}" class="card-img-top">
            </div>
            <div class="card-body d-flex flex-column">
                <span class="category-badge mb-2">${book.category}</span>
                <h5 class="book-title">${book.title}</h5>
                <p class="book-author text-muted">${book.author}</p>
                <div class="rating mb-2">${stars}</div>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="book-price">$${book.price}</span>
                        <small class="text-muted">${book.stock} in stock</small>
                    </div>
                    <button class="btn btn-primary w-100" onclick="addToCart('${book.id}')">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Handle category link clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href*="category="]')) {
        e.preventDefault();
        const url = new URL(e.target.href);
        const category = url.searchParams.get('category');
        window.location.href = `books.php?category=${encodeURIComponent(category)}`;
    }
});