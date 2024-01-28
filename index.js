const subredditInput = document.getElementById("subreddit");
const results = document.getElementById("results");

subredditInput.addEventListener("input", () => search(subredditInput.value));
subredditInput.addEventListener("focus", () => search(subredditInput.value));
subredditInput.addEventListener("blur", () => {
    console.log("unfocus");
    // results.style.display = "none";
    setTimeout(() => {
        results.style.display = 'none';
    }, 500)
});

let subredditData;

fetch("subreddits.txt")
    .then((response) => response.text())
    .then((data) => {
        subredditData = data;
    })
    .catch((error) => {
        console.error("Error:", error);
    });

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("main-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const query = formData.get("search");
        const subreddit = formData.get("subreddit");
        const url = `https://www.reddit.com/r/${subreddit}/search/?q=${query}&restrict_sr=1`;
        window.open(url, "_blank");
    });
});

function search(searchQuery) {
    console.log("searchQuery", searchQuery);
    const lines = subredditData.split("\n");
    const matchingLines = lines.filter((line) => line.includes(searchQuery));
    results.innerHTML = "";
    results.style.display = "block";
    results.innerHTML = matchingLines
        .slice(0, 10)
        .map(
            (line, index) =>
                `<div id="line-${index}" class="result">${line}</div>`
        )
        .join("");
    const resultElements = document.querySelectorAll(".result");
    resultElements.forEach((element) => {
        element.addEventListener("click", () => {
            subredditInput.value = element.innerHTML;
            console.log("element.innerHTML", element.innerHTML);
        });
    });
}
