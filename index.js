const subredditInput = document.getElementById("subreddit");
const results = document.getElementById("results");

subredditInput.addEventListener("input", () => search(subredditInput.value));

let subredditData;

fetch('subreddits.txt')
    .then(response => response.text())
    .then(data => {
        subredditData = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

function search(searchQuery) {
    const lines = subredditData.split('\n');
    const matchingLines = lines.filter(line => line.includes(searchQuery));
    results.innerHTML = matchingLines.slice(0, 10).map((line, index) => `<div id="line-${index}" class="result">${line}</div>`).join('');
}