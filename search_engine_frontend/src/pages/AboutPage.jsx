import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 space-y-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold text-primary mb-4">À propos du projet</h1>

      <p>
        Ce moteur de recherche a été réalisé dans le cadre d’un Projet de Fin d’Études (PFE).
        Il permet d’effectuer des recherches intelligentes sur une base de connaissances à l’aide d’un backend Flask
        et d’un frontend React moderne avec intégration des fonctionnalités :
      </p>

      <ul className="list-disc list-inside space-y-1">
        <li>Recherche contextuelle avec Flask + NLP</li>
        <li>Interface utilisateur moderne avec React + Tailwind</li>
        <li>Historique et favoris sauvegardés localement</li>
        <li>Dark mode, animations, responsive design</li>
        <li>Authentification (à venir)</li>
        <li>Statistiques d’utilisation (en cours)</li>
      </ul>

      <p>
        Ce projet reflète une application complète avec de vraies interactions utilisateurs, de la persistance de données,
        et une expérience fluide.
      </p>

      <p className="text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} — Réalisé avec ❤️ par [Mouna Wahada]
      </p>
    </div>
  );
}
