// router.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App"; // Vérifiez le chemin et l'export de App.jsx
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import UserDashboardPage from "./pages/UserDashboardPage"; // Vérifiez l'export de UserDashboardPage.jsx
import ProtectedRoute from "./components/ProtectedRoute"; // Vérifiez l'export de ProtectedRoute.jsx
import HistoryPage from "./pages/HistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Sera rendu pour toutes les routes enfants
    // errorElement: <GlobalErrorPage />, // Optionnel: un errorElement personnalisé pour la racine
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        ),
        // errorElement: <DashboardErrorPage />, // Optionnel: un errorElement spécifique à cette route
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        ),
      },
      // Optionnel: Une route "catch-all" pour les vraies 404
      // { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}