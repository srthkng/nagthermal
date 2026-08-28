document.getElementById('year').textContent=new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {

    const newsContainer = document.getElementById("latest-news");

    // Only run this code if the Latest News section exists
    if (!newsContainer) return;

    fetch("pages/news.html")
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");

            const newsSections = doc.querySelectorAll("section.mb-5");

            let newsItems = [];

            // Go through each year section
            newsSections.forEach(section => {

                const cards = section.querySelectorAll(".card");

                cards.forEach(card => {

                    const date = card.querySelector(".col-md-2 strong");
                    const title = card.querySelector("h5");

                    if (date && title) {

                        newsItems.push({
                            date: date.textContent.trim(),
                            title: title.textContent.trim()
                        });

                    }

                });

            });

            // Display only the first 5 news items
            const latestNews = newsItems.slice(0, 5);

            newsContainer.innerHTML = "";

            latestNews.forEach(news => {

                const item = document.createElement("div");

                item.className = "mb-3";

                item.innerHTML = `
                    <div class="row">

                        <div class="col-md-2">
                            <span class="text-muted">
                                ${news.date}
                            </span>
                        </div>

                        <div class="col-md-10">
                            <a href="pages/news.html" class="text-decoration-none">
                                <strong>
                                    ${news.title}
                                </strong>
                            </a>
                        </div>

                    </div>
                `;

                newsContainer.appendChild(item);

            });

        })
        .catch(error => {

            console.error("Error loading news:", error);

            newsContainer.innerHTML =
                '<p class="text-muted">Unable to load latest news.</p>';

        });

});
