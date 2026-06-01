const searchForm = document.querySelector("#search-form");
const keywordInput = document.querySelector("#keywords");
const statusMessage = document.querySelector("#status-message");
const resultList = document.querySelector("#results");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = keywordInput.value;
    const url = "https://api.tvmaze.com/search/shows?q=" + keyword;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            resultList.innerHTML = "";

            data.forEach(function (item) {
                const show = item.show;

                resultList.insertAdjacentHTML("beforeend", "<p>" + show.name + "</p>");
            });

            statusMessage.textContent = "Results loaded.";
        });
});