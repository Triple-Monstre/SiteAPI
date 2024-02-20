    const apiKey = 'e0e509567876c0eaeef890e7295fc3c8';
    const apiUrl = 'https://api.themoviedb.org/3';
    const language= 'fr-FR'
    const baseUrl= 'https://api.themoviedb.org/3/movie/popular'
    const SerieUrl= 'https://api.themoviedb.org/3/tv/popular'

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

    //focntion pour effectuer la recherche
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
              const imageBaseUrl = 'https://image.tmdb.org/t/p/';
              const imageSize = 'w500'; // Taille de l'image
              const imageUrl = imageBaseUrl + imageSize + movie.poster_path;
              const movieElement = document.createElement('div');
              movieElement.innerHTML = `
                        <h2>${movie.title}</h2>
                        <img src="${imageUrl}" alt="${movie.title}">
                        <h3>${movie.release_date}</h3>
                    `;
              resultsContainer.appendChild(movieElement);
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



// Fonction pour récupérer les détails d'un film par son ID
async function fetchMovieDetails(movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`;
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayMovieDetails(data);
  } catch (error) {
      console.error('Erreur lors de la récupération des détails du film :', error);
  }
}

// Fonction pour afficher les détails d'un film
function displayMovieDetails(movie) {
  alert(`Titre: ${movie.original_title}\nDate de sortie: ${movie.release_date}\nNote moyenne: ${movie.vote_average}\nSynopsis: ${movie.overview}`);
}


// Fonction pour récupérer les films populaires d'une page donnée
async function fetchPopularMovies(pageNumber) {
  const apiUrl = `${baseUrl}?api_key=${apiKey}&language=${language}&page=${pageNumber}`;
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayMovies(data.results);
      displayPageNumbers(data.total_pages, pageNumber);
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
  }
}

//Fonction pour afficher les films populaires

  function displayMovies(movies) {
  const resultsContainer = document.getElementById('populaire');
  resultsContainer.innerHTML = ''; // Effacer le contenu précédent

    movies.forEach(movie => {
      const originalTitle = movie.title;
      const imageBaseUrl = 'https://image.tmdb.org/t/p/';
      const imageSize = 'w500'; // Taille de l'image
      const imageUrl = imageBaseUrl + imageSize + movie.poster_path;
      const image = document.createElement('div');
      image.innerHTML = `<h2>${movie.title}</h2><img src="${imageUrl}" alt="${movie.title}">`;
      image.addEventListener('click', () => fetchMovieDetails(movie.id)); // Ajout d'un gestionnaire d'événements pour afficher les détails du film
      resultsContainer.appendChild(image);
    }); 
  }
// Afficher les films de la première page au chargement de la page
fetchPopularMovies(1);






// Fonction pour récupérer les détails d'un film par son ID
async function fetchSerieDetails(serieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${serieId}?api_key=${apiKey}&language=${language}`;
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displaySerieDetails(data);
  } catch (error) {
      console.error('Erreur lors de la récupération des détails du film :', error);
  }
}

// Fonction pour afficher les détails d'un film
function displaySerieDetails(serie) {
  alert(`Titre: ${serie.name}\nDate de sortie: ${serie.release_date}\nNote moyenne: ${serie.vote_average}`);
}

// Fonction pour récupérer les séries populaires d'une page donnée
async function fetchPopularSeries(pageNumber) {
  const apiUrl = `${SerieUrl}?api_key=${apiKey}&language=${language}&page=${pageNumber}`; // Modification de l'URL
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displaySeries(data.results);
      displayPageNumbers(data.total_pages, pageNumber);
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
  }
}

// Fonction pour afficher les séries
function displaySeries(series) {
  const resultsContainer = document.getElementById('Série');
  resultsContainer.innerHTML = ''; // Effacer le contenu précédent

  series.forEach(serie => {
      const imageSerieUrl = 'https://image.tmdb.org/t/p/';
      const imageSize = 'w500'; // Taille de l'image
      const imageUrl = imageSerieUrl + imageSize + serie.poster_path;
      const serieElement = document.createElement('div'); // Utiliser 'serieElement' au lieu de 'image' pour refléter le contenu
      serieElement.innerHTML= `<img src="${imageUrl}" alt="${serie.name}"/><h2>${serie.name}</h2>`;
      serieElement.addEventListener('click', () => fetchSerieDetails(serie.id)); // Ajout d'un gestionnaire d'événements pour afficher les détails du film
      resultsContainer.appendChild(serieElement); // Utiliser 'serieElement' au lieu de 'image' pour l'ajout au conteneur
  });
}
// Afficher les séries de la première page au chargement de la page
fetchPopularSeries(1);




// Fonction pour afficher les numéros de page
function displayPageNumbers(totalPages, currentPage) {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = ''; // Effacer le contenu précédent

  const pagesToDisplay = Math.min(totalPages, 20);

  for (let i = 1; i <= pagesToDisplay; i++) {
      const pageNumberLink = document.createElement('a');
      pageNumberLink.href = '#';
      pageNumberLink.textContent = i;
      pageNumberLink.addEventListener('click', () => fetchPopularMovies(i));
      pageNumberLink.addEventListener('click', () => fetchPopularSeries(i));
      if (i === currentPage) {
          pageNumberLink.classList.add('currentPage');
      }

      pageNumbersContainer.appendChild(pageNumberLink);
  }
}





