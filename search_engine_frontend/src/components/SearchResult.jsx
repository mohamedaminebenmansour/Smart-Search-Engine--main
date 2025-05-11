// src/components/SearchResult.jsx
import React from 'react';

export default function SearchResult({ result }) {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-lg mb-2 text-primary">{result.title || "Résultat"}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{result.text || result.answer || "Pas de contenu"}</p>
    </div>
  );
}