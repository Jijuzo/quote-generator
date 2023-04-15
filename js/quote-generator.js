const randomBtn = document.querySelector("#random-btn");
const allAuthorsBtn = document.querySelector("#all-authors-btn");
const quote = document.querySelector(".quote");
let quoteAuthor = document.querySelector(".quote-author");
let quoteGenre = document.querySelector(".quote-genre");
const allAuthorsContainer = document.querySelector(".all-authors-container");
const gridContainer = document.querySelector(".grid-container");
const topButtons = document.querySelector(".top-buttons");
const footer = document.querySelector("footer");

async function getRandomQuote() {
  const promise = await fetch("https://api.quotable.io/random");
  const result = await promise.json();
  quote.textContent = result.content;
  quoteAuthor.textContent = result.author;
  quoteGenre.textContent = result.tags.join(", ");
}

randomBtn.addEventListener("click", getRandomQuote);
getRandomQuote();

async function getAllAuthors() {
  const promise = await fetch(
    `https://api.quotable.io/authors?sortBy=quoteCount&order=desc&limit=10`
  );
  const result = await promise.json();
  let count = 1;
  for (let oneAuthor of result.results) {
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

allAuthorsBtn.addEventListener("click", getAllAuthors(), { once: true });

allAuthorsBtn.addEventListener("click", () => {
  allAuthorsBtn.classList.toggle("active");
  if (allAuthorsBtn.classList.contains("active")) {
    gridContainer.style.display = "none";
    topButtons.style.marginBottom = "5vh";
    allAuthorsBtn.textContent = "go back to quotes";
    allAuthorsContainer.style.display = "flex";
  } else {
    allAuthorsContainer.style.display = "none";
    topButtons.style.marginBottom = "15vh";
    allAuthorsBtn.textContent = "all authors";
    gridContainer.style.display = "grid";
  }
});
