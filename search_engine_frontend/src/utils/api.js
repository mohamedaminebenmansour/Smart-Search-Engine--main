// Ce fichier suppose que vous avez configuré un proxy dans votre vite.config.js
// pour rediriger les requêtes de '/api' vers 'http://localhost:5000'.
// Exemple de configuration dans vite.config.js:
// server: {
//   proxy: {
//     '/api': {
//       target: 'http://localhost:5000',
//       changeOrigin: true,
//     }
//   }
// }

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json(); // Essayer de parser une erreur JSON du backend
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Si le corps de l'erreur n'est pas du JSON, utiliser le texte brut si possible
      try {
        const textError = await response.text();
        if (textError) errorMessage = textError.substring(0, 200); // Limiter la longueur
      } catch (textE) {
        // Ignorer si même le texte ne peut être lu
      }
    }
    console.error("Erreur API:", errorMessage, response);
    throw new Error(errorMessage);
  }
  // Si la réponse est OK mais n'a pas de contenu (ex: statut 204)
  if (response.status === 204) {
    return null;
  }
  return await response.json(); // Pour les réponses JSON valides
}

export async function registerUser(userData) {
  const response = await fetch(`/api/auth/register`, { // Chemin relatif via proxy
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function loginUser(credentials) {
  const response = await fetch(`/api/auth/login`, { // Chemin relatif via proxy
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await handleResponse(response);
  if (data && data.token) {
    localStorage.setItem("token", data.token); // Stocker le token après connexion réussie
  }
  return data;
}

export async function getHistory() {
  const token = localStorage.getItem("token");
  // ...
  // VÉRIFIEZ CE CHEMIN !
  const response = await fetch(`/api/history`, { // Ou peut-être `/api/user/history` ?
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
  });
  const data = await handleResponse(response); // handleResponse lèvera une erreur si 404
  return (data && Array.isArray(data.history)) ? data.history : [];
}

export async function searchQuery(query) {
  const token = localStorage.getItem("token"); // Si la recherche nécessite une authentification

  const response = await fetch(`/api/search`, { // Chemin relatif via proxy
    method: 'POST', // Vous avez indiqué que votre backend attend POST
    headers: {
      'Content-Type': 'application/json',
      ...(token && { "Authorization": `Bearer ${token}` }), // Ajoute l'en-tête si token existe et est requis
    },
    body: JSON.stringify({ query }), // Envoyer la query dans le corps JSON
  });
  // La fonction handleResponse s'occupera de vérifier response.ok et de parser le JSON.
  // Elle lèvera une erreur si la requête échoue.
  const data = await handleResponse(response);
  // SearchPage.jsx s'attend à data.results ou à ce que data soit un tableau.
  // Si le backend renvoie directement la liste des résultats: return data;
  // Si le backend renvoie { "results": [...] }: return data; (car SearchPage gère data.results)
  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
  // Vous pourriez vouloir ajouter un appel API pour invalider le token côté serveur si applicable
  // exemple: await fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
  console.log("Utilisateur déconnecté, token retiré.");
}