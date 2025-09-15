// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import FormPage from './pages/FormPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/anuncio/:id" element={<DetailsPage />} />
            
            <Route 
              path="/perfil" 
              element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
              } 
            />

            <Route 
              path="/novo-anuncio" 
              element={
                <PrivateRoute>
                  <FormPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/editar-anuncio/:id" 
              element={
                <PrivateRoute>
                  <FormPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;