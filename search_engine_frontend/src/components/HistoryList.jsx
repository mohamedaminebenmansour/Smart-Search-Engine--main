import React from 'react';
import HistoryItem from './HistoryItem';

const HistoryList = ({ history, onSelectItem, isLoading, error }) => {
  if (isLoading) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-6">Chargement de l'historique...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400 py-6">Erreur : {error}</p>;
  }

  if (!history || history.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400 py-6">Votre historique de recherche est vide.</p>;
  }

  return (
    <ul className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {history.map((histItem) => (
        <HistoryItem
          key={histItem.id || histItem._id} // Utilisez histItem._id si c'est ce que MongoDB renvoie
          item={histItem}
          onSelectItem={onSelectItem}
        />
      ))}
    </ul>
  );
};

export default HistoryList;