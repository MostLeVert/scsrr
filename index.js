const subredditInput = document.getElementById("subreddit");
const results = document.getElementById("results");

subredditInput.addEventListener("input", () => search(subredditInput.value));
subredditInput.addEventListener("focus", () => search(subredditInput.value));

let subredditData;

fetch("subreddits.txt")
    .then((response) => response.text())
    .then((data) => {
        subredditData = data;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && results.style.display === "block") {
        results.style.display = "none";
    }
})
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("main-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const query = formData.get("search");
        const subreddit = formData.get("subreddit");
        if (!query) {
            const url = `https://www.reddit.com/r/${subreddit}/`;
            window.open(url, "_blank");
        }
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
        .slice(0, 5)
        .map(
            (line, index) =>
                `<div tabindex="0" id="line-${index}" class="result">${line}</div>`
        )
        .join("");
    const resultElements = document.querySelectorAll(".result");
    resultElements.forEach((element) => {
        element.addEventListener("click", () => {
            subredditInput.value = element.innerHTML;
                results.style.display = "none";
        });
        element.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                subredditInput.value = element.innerHTML;
                results.style.display = "none";
            }
        })
    });
}
