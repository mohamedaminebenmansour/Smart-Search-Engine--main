// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    console.log("ProtectedRoute: Token non trouvé, redirection vers /login"); // Log pour débogage
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute: Token trouvé, accès autorisé."); // Log pour débogage
  return children;
};

export default ProtectedRoute;