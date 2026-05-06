const booksContainer = document.getElementById('books-container');
const searchBar = document.getElementById('search-bar');
const cartCountDisplay = document.getElementById('cart-count');

let allPaidBooks = [];
// Get cart items from local storage, or start with an empty array if none exist
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Update cart counter in the navbar
function updateCartCount() {
    cartCountDisplay.textContent = cartItems.length;
}

// 1. Fetch the books from the JSON file
fetch('data/paid-books.json')
    .then(response => response.json())
    .then(data => {
        allPaidBooks = data;
        displayBooks(allPaidBooks);
        updateCartCount();
    })
    .catch(error => {
        console.error("Error loading books:", error);
        booksContainer.innerHTML = `<div class="no-results">Error loading premium books.</div>`;
    });

// 2. Display the books
function displayBooks(books) {
    booksContainer.innerHTML = '';

    if (books.length === 0) {
        booksContainer.innerHTML = `<div class="no-results">No books found. Try a different search!</div>`;
        return;
    }

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        // Check if book is already in the cart (The bug fix from your PDF!)
        const isInCart = cartItems.some(item => item.title === book.title);
        
        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author" style="margin-bottom: 5px;">Author: ${book.author}</div>
            <div class="book-price" style="font-size: 1.2rem; color: #00d2ff; margin-bottom: 20px; flex-grow: 1;">$${book.price}</div>
            <button class="btn btn-outline add-to-cart-btn" data-title="${book.title}" data-author="${book.author}" data-price="${book.price}" ${isInCart ? 'disabled' : ''}>
                ${isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
        `;
        
        booksContainer.appendChild(card);
    });

    // Attach click events to the new buttons
    attachCartEvents();
}

// 3. Handle Add to Cart Clicks
function attachCartEvents() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get data from the button we clicked
            const bookData = {
                title: this.getAttribute('data-title'),
                author: this.getAttribute('data-author'),
                price: parseFloat(this.getAttribute('data-price'))
            };

            // Add to our cart array
            cartItems.push(bookData);
            
            // Save to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update UI: Disable button and change text
            this.disabled = true;
            this.textContent = "Added to Cart";
            
            // Update the number in the navbar
            updateCartCount();
            
            // Alert user (as shown in the PDF)
            alert("Successful. Click on CART from the menu and you will be redirected.");
        });
    });
}

// 4. Search Bar Logic
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredBooks = allPaidBooks.filter(book => {
        return book.title.toLowerCase().includes(searchString) || 
               book.author.toLowerCase().includes(searchString);
    });
    displayBooks(filteredBooks);
});

// Initial cart count check
updateCartCount();