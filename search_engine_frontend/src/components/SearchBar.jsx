import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Tape ta question ici..."
        className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="p-2 bg-primary text-white rounded hover:bg-blue-600"
        title="Rechercher"
      >
        <Search />
      </button>
    </form>
  );
}
