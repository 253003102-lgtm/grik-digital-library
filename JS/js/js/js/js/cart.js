const cartContainer = document.getElementById('cart-container');
const cartSummary = document.getElementById('cart-summary');
const subtotalDisplay = document.getElementById('subtotal');
const cartCountDisplay = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Fetch items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
    cartCountDisplay.textContent = cartItems.length;
}

// Function to draw the cart items on the screen
function renderCart() {
    cartContainer.innerHTML = ''; // Clear container
    
    // Check if empty
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p style="text-align: center; color: #b0c4de; padding: 20px;">Your cart is currently empty. Visit the Paid Books section to add items!</p>`;
        cartSummary.style.display = 'none'; // Hide subtotal and button
        return;
    }

    let subtotal = 0;
    cartSummary.style.display = 'block'; // Show subtotal and button

    // Loop through items and create HTML
    cartItems.forEach((item, index) => {
        subtotal += item.price;
        
        const cartItemHTML = document.createElement('div');
        cartItemHTML.className = 'cart-item';
        cartItemHTML.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-author">By ${item.author}</span>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                <button class="btn-remove" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItemHTML);
    });

    // Update the subtotal text
    subtotalDisplay.textContent = subtotal.toFixed(2);
}

// Function to remove an item (Attached to window so HTML can trigger it)
window.removeItem = function(index) {
    cartItems.splice(index, 1); // Remove from array
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update storage
    updateCartCount(); // Update navbar number
    renderCart(); // Redraw the cart
};

// Checkout Button Click Event
checkoutBtn.addEventListener('click', () => {
    // We intentionally DO NOT clear the local storage here.
    // This fixes the bug highlighted in the teacher's PDF!
    
    checkoutBtn.textContent = "Processing Payment...";
    checkoutBtn.disabled = true;
    
    // Simulate a payment processing delay, then redirect
    setTimeout(() => {
        window.location.href = 'thank-you.html';
    }, 1500);
});

// Run these functions immediately when the page loads
updateCartCount();
renderCart();