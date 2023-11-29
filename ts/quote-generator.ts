import { baseUrl } from "./baseUrl.js";

const randomBtn = document.querySelector("#random-btn");
const quote = document.querySelector(".quote") as HTMLElement;
const quoteAuthor = document.querySelector(".quote-author") as HTMLElement;
const quoteGenre = document.querySelector(".quote-genre") as HTMLElement;
const quoteLoader = document.querySelector("#quote-loader") as HTMLElement;
const randomQuoteUrl = new URL("/random", baseUrl);

type RandomQuote = {
  content: string;
  author: string;
  tags: string;
};

async function getRandomQuote(): Promise<RandomQuote> {
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

if (randomBtn) randomBtn.addEventListener("click", setRandomQuote);
setRandomQuote();
