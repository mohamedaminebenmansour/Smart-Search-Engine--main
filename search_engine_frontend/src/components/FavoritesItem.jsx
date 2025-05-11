import React from 'react';
import { Star } from 'lucide-react';

const FavoritesItem = ({ item, onRemove }) => {
  const formatDate = (isoTimestamp) => {
    if (!isoTimestamp) return 'Date inconnue';
    try {
      return new Date(isoTimestamp).toLocaleString('fr-FR', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return isoTimestamp;
    }
  };

  return (
    <li className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out">
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {item.content}
          </p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            <Star size={12} className="mr-1.5 opacity-70" />
            <span>{formatDate(item.timestamp)}</span>
          </div>
        </div>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
};

export default FavoritesItem;