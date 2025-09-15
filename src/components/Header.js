// frontend/src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      alert('Falha ao fazer logout.');
    }
  }

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          MinhasSkins
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-orange-400 transition-colors">
            Home
          </Link>
          <Link to="/novo-anuncio" className="hover:text-orange-400 transition-colors">
            Anunciar Skin
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="text-sm text-gray-300">{currentUser.displayName}</span>
              <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-400 transition-colors text-sm">
                Login
              </Link>
              <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;