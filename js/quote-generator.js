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
let allAuthorsFetchCalled = false;

async function getRandomQuote() {
  try {
    quoteLoader.style.display = "flex";
    quote.style.display = "none";
    quoteAuthor.style.display = "none";
    quoteGenre.style.display = "none";
    const promise = await fetch("https://api.quotable.io/random");
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
    throw error;
  }
}

async function setRandomQuote() {
  const randomQuote = await getRandomQuote();
  quote.textContent = randomQuote.content;
  quoteAuthor.textContent = randomQuote.author;
  quoteGenre.textContent = randomQuote.tags.join(", ");
}

randomBtn.addEventListener("click", setRandomQuote);
setRandomQuote();

async function getAllAuthors() {
  try {
    allAuthorsLoader.style.display = "flex";
    const promise = await fetch(
      `https://api.quotable.io/authors?sortBy=quoteCount&order=desc&limit=10`
    );
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    allAuthorsLoader.style.display = "none";
    return (result = await promise.json());
  } catch (error) {
    console.error("Error:", error);
    allAuthorsLoader.style.display = "none";
    throw error;
  }
}

async function setAllAuthors() {
  const authors = await getAllAuthors();
  let count = 1;
  for (let oneAuthor of authors.results) {
    const authorContainer = document.createElement("div");
    authorContainer.classList.add("all-authors-item");
    const authorInfo = document.createElement("h3");
    authorInfo.classList.add("all-authors-item-content");
    authorInfo.textContent = `${count}. ${oneAuthor.name} has ${oneAuthor.quoteCount} great qoutes`;
    count++;
    authorContainer.appendChild(authorInfo);
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
  backToQuotesBtn.style.display = "block";
  gridContainer.style.display = "none";
  topButtons.style.marginBottom = "5vh";
  allAuthorsContainer.style.display = "flex";
});

backToQuotesBtn.addEventListener("click", () => {
  backToQuotesBtn.style.display = "none";
  allAuthorsBtn.style.display = "block";
  randomBtn.style.display = "block";
  allAuthorsContainer.style.display = "none";
  topButtons.style.marginBottom = "15vh";
  gridContainer.style.display = "grid";
});
