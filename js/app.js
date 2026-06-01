const searchForm = document.querySelector("#search-form");
const keywordInput = document.querySelector("#keywords");
const statusMessage = document.querySelector("#status-message");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = keywordInput.value;

    statusMessage.textContent = "you searched for: " + keyword;
});