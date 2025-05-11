// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ou le port que vous utilisez pour le frontend
    proxy: {
      // Toutes les requêtes qui commencent par /api sur le serveur de dev frontend
      // seront redirigées vers votre backend Flask.
      '/api': {
        target: 'http://localhost:5000', // L'URL de base de votre backend Flask
        changeOrigin: true, // Important pour que le backend voie la requête comme venant d'une origine différente
        // secure: false, // Décommentez si votre backend utilise HTTPS avec un certificat auto-signé (rare en dev local)
        // ws: true, // Si vous utilisez des WebSockets, mais pas pertinent ici a priori
      }
    }
  }
})