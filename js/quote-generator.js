const randomBtn = document.querySelector("#random-btn");
const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".quote-author");
const quoteGenre = document.querySelector(".quote-genre");
const quoteLoader = document.querySelector("#quote-loader");
const baseUrl = "https://api.quotable.io";
const randomQuoteUrl = new URL("/random", baseUrl);

async function getRandomQuote() {
  try {
    quoteLoader.style.display = "flex";
    quote.style.display = "none";
    quoteAuthor.style.display = "none";
    quoteGenre.style.display = "none";
    const promise = await fetch(randomQuoteUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    quoteLoader.style.display = "none";
    quote.style.display = "block";
    quoteAuthor.style.display = "block";
    quoteGenre.style.display = "block";
    return await promise.json();
  } catch (error) {
    console.error("Error:", error);
    quoteLoader.style.display = "none";
    quote.style.display = "block";
    quote.style.color = "red";
    quote.textContent =
      "An error occurred while generating your quote. Please try again later.";
    throw error;
  }
}

async function setRandomQuote() {
  const { content, author, tags } = await getRandomQuote();
  quote.textContent = content;
  quoteAuthor.textContent = author;
  quoteGenre.textContent = tags;
}

randomBtn.addEventListener("click", setRandomQuote);
setRandomQuote();
