const quoteEl = document.getElementById('quote');
const btn = document.getElementById('new-quote-btn');

const fallbackQuotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
];

let quotesArray = [];

function showQuote(text) {
  quoteEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = text;
    quoteEl.style.animation = 'fadeIn 1s forwards';
  }, 500);
}

function showRandomQuote() {
  if(quotesArray.length === 0) {
    // fallback quotes se quote show karo
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const quoteObj = fallbackQuotes[randomIndex];
    showQuote(`"${quoteObj.text}" — ${quoteObj.author}`);
  } else {
    // API quotes me se
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const quoteObj = quotesArray[randomIndex];
    const author = quoteObj.author ? quoteObj.author : "Unknown";
    showQuote(`"${quoteObj.text}" — ${author}`);
  }
}

async function fetchQuotes() {
  showQuote("Loading...");
  try {
    const response = await fetch('https://type.fit/api/quotes');
    if(!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    quotesArray = data;
    showRandomQuote();
  } catch (error) {
    console.error("Error fetching quotes:", error);
    // fallback quotes dikhao agar API fail ho jaye
    showRandomQuote();
  }
}

btn.addEventListener('click', showRandomQuote);

// Page load par quotes fetch karo
window.onload = fetchQuotes;
