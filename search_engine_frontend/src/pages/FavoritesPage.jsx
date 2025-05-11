import React, { useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../utils/api';
import FavoritesList from '../components/FavoritesList';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newFavorite, setNewFavorite] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const data = await getFavorites();
        setFavorites(data || []);
      } catch (err) {
        setError(err.message || "Erreur de chargement des favoris");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleAddFavorite = async (e) => {
    e.preventDefault();
    if (!newFavorite.trim()) return;
    
    try {
      const added = await addFavorite(newFavorite);
      setFavorites([added, ...favorites]);
      setNewFavorite("");
    } catch (err) {
      setError(err.message || "Erreur d'ajout du favori");
    }
  };

  const handleRemove = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
    } catch (err) {
      setError(err.message || "Erreur de suppression");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800 dark:text-blue-300">
        Mes Favoris
      </h1>
      
      <form onSubmit={handleAddFavorite} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newFavorite}
            onChange={(e) => setNewFavorite(e.target.value)}
            placeholder="Ajouter un nouveau favori..."
            className="flex-1 p-2 rounded border dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </form>

      <div className="max-w-2xl mx-auto">
        <FavoritesList
          favorites={favorites}
          onRemove={handleRemove}
          isLoading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;