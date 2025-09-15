// frontend/src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser.displayName || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (currentUser.displayName === name || name.trim() === '') {
      return;
    }

    try {
      setMessage('');
      setLoading(true);
      await updateProfile(currentUser, { displayName: name });
      setMessage('Perfil atualizado com sucesso!');
      setTimeout(() => navigate('/'), 1500); // Volta para home após sucesso
    } catch (error) {
      setMessage('Falha ao atualizar o perfil.');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h2>
        {message && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" defaultValue={currentUser.email} disabled className="w-full p-2 border rounded-md bg-gray-100" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome de Exibição</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded-md" />
          </div>
          <button disabled={loading} type="submit" className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50">
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}