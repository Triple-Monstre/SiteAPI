const apiKey = 'e0e509567876c0eaeef890e7295fc3c8';
const apiUrl = 'https://api.themoviedb.org/3';

// Fonction pour effectuer une requête GET à l'API TMDb
async function fetchTmdbData(endpoint, params = {}) {
  // Ajoutez la clé API à la liste de paramètres
  const queryParams = { ...params, api_key: apiKey };

  // Construisez l'URL complète avec les paramètres
  const url = new URL(`${apiUrl}${endpoint}`);
  url.search = new URLSearchParams(queryParams);

  try {
    // Effectuez la requête GET et récupérez la réponse en JSON
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
}

// Exemple d'utilisation : Récupérer la liste des films populaires
async function getPopularMovies() {
  try {
    const endpoint = '/movie/popular';
    const params = { language: 'fr-FR', page: 1 }; // Vous pouvez ajuster les paramètres selon vos besoins
    const response = await fetchTmdbData(endpoint, params);
    
    // Affichez les résultats dans la console
    console.log('Liste des films populaires:', response.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des films populaires:', error);
  }
}

// Appelez la fonction pour obtenir la liste des films populaires
getPopularMovies();