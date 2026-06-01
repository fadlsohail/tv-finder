const searchForm = document.querySelector("#search-form");
const statusMessage = document.querySelector("#status-message");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    statusMessage.textContent = "Search clicked";
});