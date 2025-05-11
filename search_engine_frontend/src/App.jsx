// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Supposons que vous ayez une barre de navigation

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Ou tout autre layout commun */}
      <main className="pt-16"> {/* Marge pour une navbar fixe par exemple */}
        <Outlet /> {/* C'est ici que UserDashboardPage, SearchPage, etc. seront rendus */}
      </main>
      {/* Footer, etc. */}
    </div>
  );
}

export default App;