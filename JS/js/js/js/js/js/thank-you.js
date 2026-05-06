const purchasedBooksContainer = document.getElementById('purchased-books');

// 1. Fetch the purchased books from local storage
const purchasedBooks = JSON.parse(localStorage.getItem('cartItems')) || [];

function displayPurchasedBooks() {
    purchasedBooksContainer.innerHTML = ''; // Clear loading text

    // If somehow someone accesses this page with an empty cart
    if (purchasedBooks.length === 0) {
        purchasedBooksContainer.innerHTML = `<p style="text-align: center; color: #ff6b6b;">No recent purchases found. Your session may have expired.</p>`;
        return;
    }

    // 2. Display the books with "Read" buttons
    purchasedBooks.forEach(book => {
        const item = document.createElement('div');
        item.className = 'cart-item'; // Reusing our neat CSS class
        item.style.marginBottom = '15px';
        
        item.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-title">${book.title}</span>
                <span class="cart-item-author">By ${book.author}</span>
            </div>
            <div class="cart-item-actions">
                <a href="demo.pdf" target="_blank" class="btn btn-primary" style="padding: 5px 20px; font-size: 0.9rem;">Read</a>
            </div>
        `;
        purchasedBooksContainer.appendChild(item);
    });

    // 3. THE CRITICAL BUG FIX
    // Now that we have safely loaded the data onto the screen, we can clear the cart.
    // We use a slight delay just to ensure the DOM has fully rendered.
    setTimeout(() => {
        localStorage.removeItem('cartItems');
        console.log("Cart items safely cleared after rendering.");
    }, 1000);
}

// Run the function
displayPurchasedBooks();