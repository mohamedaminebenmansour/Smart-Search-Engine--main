// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Search, Info, ArrowRight, Zap, Brain } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDirectSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const FeatureCard = ({ title, description, icon, path, gradientClasses }) => (
    <div
      onClick={() => navigate(path)}
      className={`cursor-pointer p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${gradientClasses} text-white flex flex-col items-center text-center`}
    >
      <div className="text-5xl mb-5">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-base opacity-90 leading-relaxed">{description}</p>
    </div>
  );

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-10 pb-12 md:pt-16 md:pb-16 min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-12rem)]">
        <div 
          className="fixed inset-0 opacity-[0.03] bg-repeat -z-10 pointer-events-none" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M30 0c16.568 0 30 13.432 30 30S46.568 60 30 60C13.432 60 0 46.568 0 30S13.432 0 30 0zm0 2c15.464 0 28 12.536 28 28s-12.536 28-28 28S2 45.464 2 30 12.536 2 30 2zm0 12c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm0 2c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        
        <div className="relative z-0 bg-white/80 backdrop-blur-xl p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-gray-200/60"> {/* Suppression des classes dark: */}
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-5 sm:mb-6">
              <Zap size={40} className="text-yellow-500 mr-2 sm:mr-3 transform -rotate-12" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
                <span className="text-gray-800">Bienvenue, </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
                  TrouVài
                </span> 
              </h1>
              <Brain size={40} className="text-purple-500 ml-2 sm:ml-3 transform rotate-12" />
            </div>

            <p className="text-md sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              🚀 Bienvenue dans une nouvelle ère de recherche 🤖 <br className="hidden sm:block"/>
            </p>

            <form onSubmit={handleDirectSearch} className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-2.5 mx-auto bg-white/60 p-1.5 rounded-full shadow-lg border border-gray-300/50"> {/* Suppression des classes dark: */}
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Que cherchez-vous aujourd'hui ?"
                className="flex-grow w-full text-base sm:text-lg px-5 py-3 rounded-full border-none 
                           bg-transparent text-gray-900 placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           transition-all duration-200"
                aria-label="Champ de recherche principal"
              />
              <button
                type="submit"
                className="w-full mt-2 sm:mt-0 sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white 
                           font-semibold text-base sm:text-lg py-3 px-6 sm:px-7 rounded-full 
                           transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg
                           flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300/70"
                aria-label="Lancer la recherche"
              >
                Rechercher <ArrowRight size={18} className="ml-1.5" />
              </button>
            </form>
            
            <p className="mt-8 text-sm text-gray-600">
              Découvrez <NavLink to="/about" className="font-medium text-blue-600 underline hover:text-blue-700">notre mission</NavLink> pour en savoir plus.
            </p>
          </div>
        </div>
      </main>
      
      <section className="py-10 md:py-12 bg-transparent w-full"> 
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
             <FeatureCard
                title="À Propos de TrouVài"
                description="Découvrez la mission, la vision et la technologie innovante derrière notre moteur de recherche."
                icon={<Info size={36} />}
                path="/about"
                gradientClasses="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700"
              />
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-xs sm:text-sm text-gray-600 border-t border-gray-200/30 mt-auto"> {/* Suppression des classes dark: */}
        © {new Date().getFullYear()} TrouVài. Tous droits réservés.
      </footer>
    </>
  );
};

export default HomePage;