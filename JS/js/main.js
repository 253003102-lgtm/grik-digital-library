const quotes = [
    "\"The only way to do great work is to love what you do.\" - Steve Jobs",
    "\"The more that you read, the more things you will know. The more that you learn, the more places you'll go.\" - Dr. Seuss",
    "\"A reader lives a thousand lives before he dies.\" - George R.R. Martin",
    "\"Books are a uniquely portable magic.\" - Stephen King"
];

const quoteDisplay = document.getElementById("quote-display");
let currentQuoteIndex = 0;

function changeQuote() {
    // Fade out
    quoteDisplay.style.opacity = 0;
    
    setTimeout(() => {
        // Change text and fade back in
        quoteDisplay.textContent = quotes[currentQuoteIndex];
        quoteDisplay.style.opacity = 1;
        
        // Update index for next time
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }, 500); // Waits for fade out to complete
}

// Add a smooth CSS transition to the element via JS
quoteDisplay.style.transition = "opacity 0.5s ease-in-out";

// Initial call
changeQuote();

// Change quote every 10 seconds (10000 milliseconds)
setInterval(changeQuote, 10000);