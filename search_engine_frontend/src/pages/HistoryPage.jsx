import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/api'; // Assurez-vous que le chemin est correct
import HistoryList from '../components/HistoryList'; // Assurez-vous que le chemin est correct

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getHistory();
        setHistory(data || []);
      } catch (err) {
        setError(err.message || "Erreur inconnue lors de la récupération de l'historique.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistoryData();
  }, []);

  const handleSelectItem = (item) => {
    navigate('/search', { state: { query: item.query } });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800 dark:text-blue-300">
        Historique de Recherche
      </h1>
      <div className="max-w-2xl mx-auto">
        <HistoryList
          history={history}
          onSelectItem={handleSelectItem}
          isLoading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default HistoryPage;