const quoteContainer =  document.getElementById ('quote-container');
const quoteText =  document.getElementById ('quote');
const authorText =  document.getElementById ('author');
const twitterBtn =  document.getElementById ('twitter');
const newQuoteBtn =  document.getElementById ('new-quote');
const loader =  document.getElementById ('loader');

let apiQuotes = []

// Show New Quote

function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // authorText.textContent = quote.author;
    // Check if Author field is blank and replace it with 'unknown'

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //  Check Quote length to determin styling 
    if  (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, and hide loader

    quoteText.textContent = quote.text;
    complete();

}
// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;

}


// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // const apiUrl = 'https://zenquotes.io/api/quotes/';
  
    
    try {
        const response = await fetch(apiUrl);
        
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();


    }catch(error){
        // Catch Error Here
        console.error('Error fetching quotes:', error);


    }
}

// Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

// Event Listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();

//loading();