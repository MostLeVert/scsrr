const subredditInput = document.getElementById("subreddit");
const results = document.getElementById("results");

subredditInput.addEventListener("input", () => search(subredditInput.value));
subredditInput.addEventListener("blur", () => results.style.display = "none");

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
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
    });
});

function search(searchQuery) {
    if (!subredditData) {
        return;
    }
    const lines = subredditData.split("\n");
    const matchingLines = lines.filter((line) => line.includes(searchQuery));
    if (matchingLines.length === 0) {
        results.style.display = "none";
        return;
    }
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
            const value = element.innerHTML;
            subredditInput.value = value;
            results.style.display = "none";
        });
    });
}
