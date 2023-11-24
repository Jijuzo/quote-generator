const allAuthorsContainer = document.querySelector(".all-authors-container");
const allAuthorsLoader = document.querySelector("#all-authors-loader");
const baseUrl = "https://api.quotable.io";
const allAuthorsUrl = new URL("/authors", baseUrl);
allAuthorsUrl.searchParams.append("sortBy", "quoteCount");
allAuthorsUrl.searchParams.append("order", "desc");
allAuthorsUrl.searchParams.append("limit", "10");

async function getAllAuthors() {
  allAuthorsLoader.style.display = "flex";
  try {
    const promise = await fetch(allAuthorsUrl);
    if (!promise.ok) {
      throw new Error(`HTTP error! Status: ${promise.status}`);
    }
    return await promise.json();
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
    const { results } = await getAllAuthors();
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
    // Handle the error here, e.g., display an error message to the user
  }
}
