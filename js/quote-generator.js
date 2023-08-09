const randomBtn = document.querySelector("#random-btn");
const allAuthorsBtn = document.querySelector("#all-authors-btn");
const backToQuotesBtn = document.querySelector("#back-to-quotes-btn");
const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".quote-author");
const quoteGenre = document.querySelector(".quote-genre");
const allAuthorsContainer = document.querySelector(".all-authors-container");
const gridContainer = document.querySelector(".grid-container");
const topButtons = document.querySelector(".top-buttons");
const footer = document.querySelector("footer");
const quoteLoader = document.querySelector("#quote-loader");
const allAuthorsLoader = document.querySelector("#all-authors-loader");
const topTenCaption = document.querySelector(".top-10-caption");
const baseUrl = "https://api.quotable.io";
const randomQuoteUrl = new URL("/random", baseUrl);
const allAuthorsUrl = new URL(
  "/authors?sortBy=quoteCount&order=desc&limit=10",
  baseUrl
);

let allAuthorsFetchCalled = false;

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
    return (result = await promise.json());
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

async function getAllAuthors() {
  try {
    allAuthorsLoader.style.display = "flex";
    const promise = await fetch(allAuthorsUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    allAuthorsLoader.style.display = "none";
    return (result = await promise.json());
  } catch (error) {
    console.error("Error:", error);
    allAuthorsLoader.style.display = "none";
    topTenCaption.style.color = "red";
    topTenCaption.textContent =
      "An error occurred while generating quotes authors. Please try again later.";
    throw error;
  }
}

async function setAllAuthors() {
  const { results } = await getAllAuthors();
  for (let authorEntry of results.entries()) {
    const [idx, author] = authorEntry;
    const authorNumber = idx + 1;
    const authorContainer = document.createElement("div");
    authorContainer.classList.add("all-authors-item");
    authorContainer.textContent = `${authorNumber}. ${author.name} has ${author.quoteCount} great qoutes`;
    allAuthorsContainer.appendChild(authorContainer);
  }
}

backToQuotesBtn.style.display = "none";

allAuthorsBtn.addEventListener("click", () => {
  if (!allAuthorsFetchCalled) {
    setAllAuthors();
    allAuthorsFetchCalled = true;
  }
  randomBtn.style.display = "none";
  allAuthorsBtn.style.display = "none";
  gridContainer.style.display = "none";
  backToQuotesBtn.style.display = "block";
  topButtons.style.marginBottom = "5vh";
  allAuthorsContainer.style.display = "flex";
});

backToQuotesBtn.addEventListener("click", () => {
  backToQuotesBtn.style.display = "none";
  allAuthorsContainer.style.display = "none";
  allAuthorsBtn.style.display = "block";
  randomBtn.style.display = "block";
  topButtons.style.marginBottom = "15vh";
  gridContainer.style.display = "grid";
});
