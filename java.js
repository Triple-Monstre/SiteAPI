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
              const movieDate = document.createElement('p');
              const imageBaseUrl = 'https://image.tmdb.org/t/p/';
              const imageSize = 'w500'; // Taille de l'image
              const imageUrl = imageBaseUrl + imageSize + movie.poster_path;
              const movieElement = document.createElement('div');
              movieElement.innerHTML = `
                        <h2>${movie.title}</h2>
                        <img src="${imageUrl}" alt="${movie.title}">
                    `;
              movieTitle.textContent = movie.title;
              movieDate.textContent  = movie.release_date;
              resultsContainer.appendChild(movieElement);
              resultsContainer.appendChild(movieTitle);
              resultsContainer.appendChild(movieDate);
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
    const moviesContainer = document.getElementById('movies');


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGU1MDk1Njc4NzZjMGVhZWVmODkwZTcyOTVmYzNjOCIsInN1YiI6IjY1ODE2MGY0N2U0MDNkMDkyNWY1NTBlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DSg738QDDLOSEH-yj2fgng-DAHoecmMuML_nvE2QgII'
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
  .then(response => response.json())
  .then(response => {
      console.log(response.results[0].original_title);

  })
  .catch(err => console.error(err));
