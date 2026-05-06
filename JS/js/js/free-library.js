const booksContainer = document.getElementById('books-container');
const searchBar = document.getElementById('search-bar');
let allBooks = []; // This will hold our data

// 1. Fetch the books from the JSON file
fetch('data/books.json')
    .then(response => response.json())
    .then(data => {
        allBooks = data;
        displayBooks(allBooks); // Show them initially
    })
    .catch(error => {
        console.error("Error loading books:", error);
        booksContainer.innerHTML = `<div class="no-results">Error loading books. Please try again.</div>`;
    });

// 2. Function to create the HTML for the cards
function displayBooks(books) {
    booksContainer.innerHTML = ''; // Clear current books

    // Handle the "No Books Found" PDF requirement
    if (books.length === 0) {
        booksContainer.innerHTML = `<div class="no-results">No books found. Try a different search!</div>`;
        return;
    }

    // Loop through the data and create a card for each
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">Author: ${book.author}</div>
            <a href="${book.link}" target="_blank" class="btn btn-outline" style="text-align: center;">Read Online</a>
        `;
        
        booksContainer.appendChild(card);
    });
}

// 3. Search Bar Event Listener
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    // Filter by title OR author
    const filteredBooks = allBooks.filter(book => {
        return book.title.toLowerCase().includes(searchString) || 
               book.author.toLowerCase().includes(searchString);
    });
    
    displayBooks(filteredBooks);
});