import React from 'react';
import { Clock } from 'lucide-react';

const HistoryItem = ({ item, onSelectItem }) => {
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
      <button
        onClick={() => onSelectItem(item)}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-md"
        title={`Relancer la recherche : ${item.query}`}
      >
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
          {item.query || "Recherche sans titre"}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
          <Clock size={12} className="mr-1.5 opacity-70" />
          <span>{formatDate(item.timestamp)}</span>
        </div>
      </button>
    </li>
  );
};

export default HistoryItem;