    const apiKey = 'e0e509567876c0eaeef890e7295fc3c8';
    const apiUrl = 'https://api.themoviedb.org/3';

    async function fetchTmdbData(endpoint, params = {}) {
      const queryParams = { ...params, api_key: apiKey };
      const url = new URL(`${apiUrl}${endpoint}`);
      url.search = new URLSearchParams(queryParams);

      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
      }
    }

    async function searchMovies() {
      const searchInput = document.getElementById('searchInput').value;
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = ''; // Efface les résultats précédents

      try {
        if (searchInput.trim() !== '') {
          const endpoint = '/search/movie';
          const params = { query: searchInput, language: 'fr-FR', page: 1 };
          const response = await fetchTmdbData(endpoint, params);

          if (response.results.length > 0) {
            response.results.forEach(movie => {
              const movieTitle = document.createElement('p');
              movieTitle.textContent = movie.title;
              resultsContainer.appendChild(movieTitle);
            });
          } else {
            resultsContainer.textContent = 'Aucun résultat trouvé.';
          }
        } else {
          resultsContainer.textContent = 'Veuillez entrer un titre de film.';
        }
      } catch (error) {
        console.error('Erreur lors de la recherche de films:', error);
      }
    }
  