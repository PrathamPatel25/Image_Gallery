const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let accessKey = "";

async function getConfig() {
  try {
    const res = await fetch("/config");
    const config = await res.json();
    accessKey = config.accessKey;
  } catch (error) {
    console.error("Error fetching configuration:", error);
  }
}

async function searchImages() {
  keyword = searchBox.value.trim();
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      data.results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
      });

      showMoreBtn.style.display = "block";
    } else {
      alert("No results found");
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = "";
  showMoreBtn.style.display = "none";
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

getConfig();
