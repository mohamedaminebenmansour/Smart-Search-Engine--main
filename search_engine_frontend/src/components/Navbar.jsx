import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, UserCircle, Search as SearchIconNav, Home, Info, Menu, X } from 'lucide-react'; // Moon et Sun supprimés

export default function Navbar() {

  const [userData, setUserData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUserData(JSON.parse(storedUser)); } 
      catch (e) { localStorage.removeItem('user'); setUserData(null); }
    } else {
      setUserData(null);
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserData(null);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevIsOpen => !prevIsOpen);
  };
  
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ease-in-out group ${
      isActive 
        ? 'bg-blue-100 text-blue-700 shadow-inner' 
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`;
  
  const authButtonClasses = (isPrimary = false) => 
    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      isPrimary 
        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;

  const iconButtonClasses = "p-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500";


  const NavItem = ({ to, icon: Icon, children, end }) => (
    <NavLink to={to} end={end} className={navLinkClasses} onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
      <Icon size={18} className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />{children}
    </NavLink>
  );

  const renderNavLinks = (isMobile = false) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-2 p-2' : 'items-center space-x-1 md:space-x-2'}`}>
      <NavItem to="/" icon={Home} end>Accueil</NavItem>
      <NavItem to="/search" icon={SearchIconNav}>Recherche</NavItem>
      {userData && (
          <NavItem to="/dashboard" icon={UserCircle}>Mon Espace</NavItem>
      )}
    </div>
  );

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80"> {/* Simplification des classes de fond */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <NavLink to="/" className="flex items-center group">
            <SearchIconNav size={28} className="text-blue-600 group-hover:text-purple-500 transition-colors duration-300 transform group-hover:rotate-[-12deg]" />
            <span className="ml-2 text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
              TrouVài
            </span>
          </NavLink>

          <div className="hidden md:flex items-center">
            {renderNavLinks()}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
                {userData ? (
                    <button onClick={handleLogout} className={`${authButtonClasses()} !py-1.5 !px-3 flex items-center !bg-red-100 !text-red-600 hover:!bg-red-200`} title="Se déconnecter">
                      <LogOut size={16} className="mr-1.5"/> Déconnexion
                    </button>
                ) : (
                  <>
                    <button onClick={() => navigate('/login')} className={authButtonClasses()}>Connexion</button>
                    <button onClick={() => navigate('/register')} className={authButtonClasses(true)}>Inscription</button>
                  </>
                )}
            </div>
            
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className={iconButtonClasses} aria-label="Ouvrir le menu">
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200">
          {renderNavLinks(true)}
          <div className="px-5 py-4 mt-2 border-t border-gray-200">
            {userData ? (
                <div className="flex items-center justify-between">
                    <NavLink to="/dashboard" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
                        <UserCircle size={24} className="mr-2 text-gray-500 group-hover:text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{userData.username}</span>
                    </NavLink>
                    <button onClick={handleLogout} className="flex items-center text-sm text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors">
                        <LogOut size={18} className="mr-1"/> Déconnexion
                    </button>
                </div>
            ) : (
              <div className="space-y-3">
                <AuthButton onClick={() => {navigate('/login'); setIsMobileMenuOpen(false);}} block>Connexion</AuthButton> {/* `block` est une prop custom, assurez-vous qu'elle est gérée dans AuthButton si besoin */}
                <AuthButton onClick={() => {navigate('/register'); setIsMobileMenuOpen(false);}} primary block>Inscription</AuthButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}