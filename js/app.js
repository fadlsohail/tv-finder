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

                const showCard = `
                <div class="bg-neutral-800 rounded border border-neutral-700 p-4">
                    <h3 class="text-xl font-semibold mb-2">${show.name}</h3>
                </div>
            `;
            
            resultList.insertAdjacentHTML("beforeend", showCard);
            });

            statusMessage.textContent = "Results loaded.";
        });
});