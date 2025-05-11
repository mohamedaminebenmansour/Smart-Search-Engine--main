// src/pages/SearchPage.jsx

import React, { useState } from "react"; // Assurez-vous que useState est importé
import { searchQuery } from "../utils/api"; // Votre fonction d'appel API

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null); // Pour stocker les erreurs de l'API

  const handleSearch = async () => {
    if (!query.trim()) {
      // Optionnel : ne pas lancer la recherche si le champ est vide ou ne contient que des espaces
      setResults([]);
      setErrorApi(null); // Réinitialiser les erreurs précédentes
      return;
    }

    setLoading(true);
    setErrorApi(null);
    setResults([]); // Vider les résultats précédents pendant une nouvelle recherche

    try {
      const data = await searchQuery(query); // Appel à votre fonction API
      // LA LIGNE LA PLUS IMPORTANTE POUR VOTRE DÉBOGAGE ACTUEL :
      console.log("Données reçues de l'API:", data); 

      // Vérifier si 'data' existe et si 'data.results' est un tableau
      if (data && Array.isArray(data.results)) {
        setResults(data.results);
      } else if (data && Array.isArray(data)) {
        // Si l'API renvoie directement un tableau (moins courant si vous attendez data.results)
        console.warn(
          "L'API a renvoyé un tableau directement. Adaptation pour afficher."
        );
        setResults(data);
      } else {
        // Si le format de 'data' n'est pas celui attendu
        console.error(
          "La réponse de l'API n'est pas au format attendu (objet avec une propriété 'results' de type tableau) ou data.results est manquant/invalide.",
          data
        );
        setErrorApi( // C'est ce qui cause votre message d'erreur "format attendu"
          "Les données reçues du serveur ne sont pas au format attendu."
        );
      }
    } catch (error) {
      console.error("Erreur capturée pendant la recherche (catch):", error);
      // Tenter d'afficher un message d'erreur plus utile
      let errorMessage = "Une erreur est survenue lors de la recherche.";
      if (error.message) {
        // Ce sera "Failed to fetch" si c'est une erreur CORS ou réseau
        errorMessage = `Erreur de recherche: ${error.message}`;
      }
      // Vous pouvez ajouter plus de logique ici pour analyser l'objet 'error'
      // par exemple, si votre API renvoie des erreurs structurées
      setErrorApi(errorMessage);
    } finally {
      setLoading(false); // Arrêter le chargement que la recherche réussisse ou échoue
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          Recherche intelligente 🔍
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Tape ta question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => { // Optionnel: lancer la recherche avec la touche Entrée
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()} // Désactiver si chargement ou si query est vide/espaces
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </div>

        {/* Affichage des messages de chargement ou d'erreur */}
        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300 my-4">
            Chargement des résultats...
          </p>
        )}
        {errorApi && !loading && ( // N'afficher l'erreur API que si pas en chargement
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span className="font-medium">Erreur!</span> {errorApi}
          </div>
        )}

        {/* Affichage des résultats ou d'un message si aucun résultat */}
        {/* N'afficher "Aucun résultat" que si pas de chargement, pas d'erreur, et une recherche a été tentée */}
        {!loading && !errorApi && results.length === 0 && query.trim() && ( 
          <p className="text-center text-gray-600 dark:text-gray-300 my-4">
            Recherche pour "{query}".
          </p>
        )}

        {!loading && !errorApi && results.length > 0 && (
          <div className="space-y-4">
            {results.map((res, index) => (
              <div
                key={res.id || index} 
                className="border p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  {res.text || "Texte du résultat manquant"}
                </p>
                {res.url && (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-300"
                  >
                    Voir la source
                  </a>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex justify-between items-center">
                  <span>
                    {res.source
                      ? `Source : ${res.source}`
                      : "Source non spécifiée"}
                  </span>
                  {typeof res.score === "number" && ( 
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      Score : {res.score.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;