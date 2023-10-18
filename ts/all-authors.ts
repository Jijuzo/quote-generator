import { baseUrl } from "./quote-generator.js";
const allAuthorsContainer = document.querySelector(
  ".all-authors-container"
) as HTMLElement;
const allAuthorsLoader = document.querySelector(
  "#all-authors-loader"
) as HTMLElement;
const allAuthorsUrl = new URL("/authors", baseUrl);
allAuthorsUrl.searchParams.append("sortBy", "quoteCount");
allAuthorsUrl.searchParams.append("order", "desc");
allAuthorsUrl.searchParams.append("limit", "10");

type AllAuthors = {
  results: { name: string; quoteCount: number }[];
};

async function getAllAuthors<T extends Record<string, unknown>>() {
  allAuthorsLoader.style.display = "flex";
  try {
    const promise = await fetch(allAuthorsUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return (await promise.json()) as T;
  } catch (error) {
    console.error("Error fetching authors:", error);
    allAuthorsLoader.style.display = "none";
    throw error;
  } finally {
    allAuthorsLoader.style.display = "none";
  }
}

async function setAllAuthors() {
  try {
    const { results } = await getAllAuthors<AllAuthors>();
    for (let idx = 0; idx < results.length; idx++) {
      const author = results[idx];
      const authorNumber = idx + 1;
      const authorContainer = document.createElement("div");
      authorContainer.classList.add("all-authors-item");
      authorContainer.textContent = `${authorNumber}. ${author.name} has ${author.quoteCount} great quotes`;
      allAuthorsContainer.appendChild(authorContainer);
    }
  } catch (error) {
    console.error("Error setting authors:", error);
  }
}

(document.querySelector("#all-authors-body") as HTMLElement).onload =
  function () {
    setAllAuthors();
  };
