const searchForm = document.querySelector("#search-form");
const keywordInput = document.querySelector("#keywords");
const statusMessage = document.querySelector("#status-message");
const resultList = document.querySelector("#results");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = keywordInput.value.trim();

    if (keyword === "") {
        statusMessage.textContent = "Please enter a show name.";
        resultList.innerHTML = "";
        return;
    }
    
    const url = "https://api.tvmaze.com/search/shows?q=" + keyword;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            resultList.innerHTML = "";

            if (data.length === 0) {
                statusMessage.textContent = "No shows found. Try another name.";
                return;
            }

            data.forEach(function (item) {
                const show = item.show;

                let poster = `<div class="w-full rounded mb-4 bg-neutral-700 text-neutral-300 flex items-center justify-center show-poster">No image</div>`;

                if (show.image) {
                    poster = `<img class="w-full rounded mb-4 show-poster" src="${show.image.medium}" alt="${show.name} poster">`;
                }

                let genres = "Genre not listed";
                let rating = "Not rated";
                let premiered = "Premiere date not listed";
                let summary = "No summary is available.";
                let showUrl = "https://www.tvmaze.com/";

                if (show.genres.length > 0) {
                    genres = show.genres.join(", ");
                }

                if (show.rating.average) {
                    rating = show.rating.average;
                }

                if (show.premiered) {
                    premiered = show.premiered;
                }


                if (show.summary) {
                    summary = show.summary;
                }

                if (show.url) {
                    showUrl = show.url;
                }

                const showCard = `
                <div class="bg-neutral-800 rounded border border-neutral-700 p-4">
                    ${poster}
                    <h3 class="text-xl font-semibold mb-2">${show.name}</h3>
                    <p class="text-md text-neutral-300 mb-1"><strong>Genres:</strong> ${genres}</p>
                    <p class="text-md text-neutral-300 mb-1"><strong>Rating:</strong> ${rating}</p>
                    <p class="text-md text-neutral-300 mb-1"><strong>Premiered:</strong> ${premiered}</p>
                    <div class="text-neutral-200 mb-4">${summary}</div>
                    <a target="_blank" href="${showUrl}" class="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        View on TVMaze
                    </a>
                </div>
            `;
            
            resultList.insertAdjacentHTML("beforeend", showCard);
            });

            statusMessage.textContent = "Results found: " + data.length;
        })
        .catch(function () {
            statusMessage.textContent = "Could not load the results. Please try again.";
        });
});