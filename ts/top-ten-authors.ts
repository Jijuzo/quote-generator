import { baseUrl } from "./baseUrl.js";

const topTenAuthorsBody = document.querySelector(
  "#top-ten-authors-body"
) as HTMLElement;
const topTenAuthorsContainer = document.querySelector(
  ".top-ten-authors-container"
) as HTMLElement;
const topTenAuthorsLoader = document.querySelector(
  "#top-ten-authors-loader"
) as HTMLElement;
const topTenAuthorsUrl = new URL("/authors", baseUrl);
topTenAuthorsUrl.searchParams.append("sortBy", "quoteCount");
topTenAuthorsUrl.searchParams.append("order", "desc");
topTenAuthorsUrl.searchParams.append("limit", "10");

type TopTenAuthors = {
  results: { name: string; quoteCount: number }[];
};

async function getTopTenAuthors(): Promise<TopTenAuthors> {
  topTenAuthorsLoader.style.display = "flex";
  try {
    const promise = await fetch(topTenAuthorsUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return await promise.json();
  } catch (error) {
    console.error("Error fetching authors:", error);
    topTenAuthorsLoader.style.display = "none";
    throw error;
  } finally {
    topTenAuthorsLoader.style.display = "none";
  }
}

async function setTopTenAuthors() {
  try {
    const { results } = await getTopTenAuthors();
    for (let idx = 0; idx < results.length; idx++) {
      const author = results[idx];
      const authorNumber = idx + 1;
      const authorContainer = document.createElement("div");
      authorContainer.classList.add("top-ten-authors-item");
      authorContainer.textContent = `${authorNumber}. ${author.name} has ${author.quoteCount} famous quotes`;
      topTenAuthorsContainer.appendChild(authorContainer);
    }
  } catch (error) {
    console.error("Error setting authors:", error);
  }
}

topTenAuthorsBody.onload = function () {
  setTopTenAuthors();
};
