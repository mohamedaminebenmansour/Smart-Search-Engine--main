import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      console.log("Réponse d'inscription:", response.data);
      navigate("/login"); 
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); 
      } else if (err.message) {
        setError(`Erreur: ${err.message}`);
      } else {
        setError("Échec de l'inscription. Une erreur inconnue est survenue.");
      }
      console.error("Erreur d'inscription:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 sm:pt-24"> 
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Créer un compte
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username_register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom d'utilisateur</label>
            <input id="username_register" type="text" placeholder="Votre nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="email_register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input id="email_register" type="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="password_register_page" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label> {/* ID modifié pour unicité si nécessaire */}
            <input id="password_register_page" type="password" placeholder="Mot de passe (min. 6 caractères)" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="confirmPassword_register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le mot de passe</label>
            <input id="confirmPassword_register" type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent sm:text-sm" required />
          </div>

          {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
          
          <button type="submit" disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>
         <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Déjà un compte ?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;