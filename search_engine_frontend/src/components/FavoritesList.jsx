import React from 'react';
import FavoritesItem from './FavoritesItem';

const FavoritesList = ({ favorites, onRemove, isLoading, error }) => {
  if (isLoading) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-6">Chargement des favoris...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400 py-6">Erreur : {error}</p>;
  }

  if (!favorites || favorites.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-6">Aucun favori enregistré.</p>;
  }

  return (
    <ul className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {favorites.map((favItem) => (
        <FavoritesItem
          key={favItem.id}
          item={favItem}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default FavoritesList;