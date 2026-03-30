

const apiKey = "0a7ebbf992c1833b8f6410c5fb4799a5";
const imageBase = "https://image.tmdb.org/t/p/w500";

// Array containing the unique fetch URLs for each specific category
const categories = [
    { id: "trending-movies", url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}` },
    { id: "marvel-movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=420` },
    { id: "bollywood-movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=hi` },
    { id: "hollywood-movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=en&region=us` },
    { id: "anime-movies", url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=ja&with_genres=16` }
];

// Loop through categories and fetch their movies
categories.forEach(category => {
    fetch(category.url)
        .then(res => res.json())
        .then(data => {

            const moviesContainer = document.getElementById(category.id);

            // Map through the results and build the cards
            data.results.forEach(movie => {

                // Skip if the movie lacks a poster
                if (!movie.poster_path) return;

                const poster = imageBase + movie.poster_path;
                const title = movie.title || movie.name;
                const year = movie.release_date ? movie.release_date.split('-')[0] : "N/A";
                const movieID = movie.id;

                /* Create movie card */
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                            <div class="poster" style="background-image:url('${poster}')">
                                <div class="play">▶️</div>
                            </div>
                            <div class="info">
                                <div class="title">${title}</div>
                                <div class="year">${year}</div>
                            </div>
                        `;

                /* Click event for trailer */
                card.onclick = () => {
                    openTrailer(movieID);
                };

                moviesContainer.appendChild(card);
            });
        })
        .catch(error => console.error(`Error fetching ${category.id}:`, error));
});

// Fetch Bollywood Actors
function fetchBollywoodActors() {
    const actorURL = `https://api.themoviedb.org/3/discover/person?api_key=${apiKey}&with_original_language=hi&sort_by=popularity.desc&page=1`;

    fetch(actorURL)
        .then(res => res.json())
        .then(data => {
            const actorsContainer = document.getElementById("bollywood-actors");

            // Get first 20 actors with profile images
            data.results.slice(0, 20).forEach(actor => {

                // Skip if actor lacks a profile picture
                if (!actor.profile_path) return;

                const profileImage = imageBase + actor.profile_path;
                const actorName = actor.name;
                const actorID = actor.id;

                /* Create actor card */
                const actorCard = document.createElement("div");
                actorCard.className = "actor-card";

                actorCard.innerHTML = `
                            <div class="actor-image" style="background-image:url('${profileImage}')">
                            </div>
                            <div class="actor-info">
                                <div class="actor-name">${actorName}</div>
                            </div>
                        `;

                actorsContainer.appendChild(actorCard);
            });
        })
        .catch(error => console.error("Error fetching bollywood actors:", error));
}

// Call the function to fetch bollywood actors
fetchBollywoodActors();





function openTrailer(movieID) {

    const apiKey = "0a7ebbf992c1833b8f6410c5fb4799a5";

    const trailerURL =
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`;

    fetch(trailerURL)

        .then(res => res.json())

        .then(data => {

            const trailer = data.results.find(
                video => video.type === "Trailer"
            );

            if (trailer) {

                const youtubeURL =
                    `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;

                // Show modal and embed trailer
                const modal = document.getElementById('trailer-modal');
                const trailerContainer = document.getElementById('trailer-container');
                const modalContent = modal.querySelector('.modal-content');

                trailerContainer.innerHTML = `<iframe src="${youtubeURL}" allowfullscreen></iframe>`;
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';

            } else {

                alert("Trailer not available");

            }

        })
        .catch(error => console.error("Error fetching trailer:", error));

}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('trailer-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalContent = modal.querySelector('.modal-content');

    function closeModal() {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
            document.getElementById('trailer-container').innerHTML = '';
        }, 300);
    }

    closeBtn.onclick = closeModal;

    // Close modal when clicking outside the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const suggestionsDiv = document.getElementById('search-suggestions');
    const searchResultsDiv = document.getElementById('search-results');
    const apiKey = "0a7ebbf992c1833b8f6410c5fb4799a5";
    const imageBase = "https://image.tmdb.org/t/p/w500";

    let searchTimeout;

    // Real-time search suggestions
    searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        if (query.length < 2) {
            suggestionsDiv.style.display = 'none';
            return;
        }

        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`)
                .then(res => res.json())
                .then(data => {
                    suggestionsDiv.innerHTML = '';
                    if (data.results && data.results.length > 0) {
                        data.results.slice(0, 5).forEach(movie => {
                            const item = document.createElement('div');
                            item.className = 'suggestion-item';
                            item.textContent = movie.title;
                            item.onclick = () => {
                                searchInput.value = movie.title;
                                suggestionsDiv.style.display = 'none';
                                performSearch(movie.title);
                            };
                            suggestionsDiv.appendChild(item);
                        });
                        suggestionsDiv.style.display = 'block';
                    } else {
                        suggestionsDiv.style.display = 'none';
                    }
                })
                .catch(error => console.error('Error fetching suggestions:', error));
        }, 300);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });

    // Search button click
    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Enter key in search input
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    function performSearch(query) {
        suggestionsDiv.style.display = 'none';
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`)
            .then(res => res.json())
            .then(data => {
                searchResultsDiv.innerHTML = '<h2 class="section-title">Search Results</h2>';
                const moviesDiv = document.createElement('div');
                moviesDiv.className = 'movies';

                if (data.results && data.results.length > 0) {
                    data.results.forEach(movie => {
                        if (!movie.poster_path) return;

                        const poster = imageBase + movie.poster_path;
                        const title = movie.title || movie.name;
                        const year = movie.release_date ? movie.release_date.split('-')[0] : "N/A";
                        const movieID = movie.id;

                        const card = document.createElement("div");
                        card.className = "card";
                        card.innerHTML = `
                                    <div class="poster" style="background-image:url('${poster}')">
                                        <div class="play">▶️</div>
                                    </div>
                                    <div class="info">
                                        <div class="title">${title}</div>
                                        <div class="year">${year}</div>
                                    </div>
                                `;
                        card.onclick = () => openTrailer(movieID);
                        moviesDiv.appendChild(card);
                    });
                } else {
                    moviesDiv.innerHTML = '<p style="color: #aaa; text-align: center; width: 100%;">No movies found.</p>';
                }

                searchResultsDiv.appendChild(moviesDiv);
                searchResultsDiv.classList.add('show');

                // Scroll to search results
                searchResultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(error => console.error('Error fetching search results:', error));
    }
});


