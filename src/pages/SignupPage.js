// frontend/src/pages/SignupPage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom'
import { updateProfile } from 'firebase/auth' 

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    if (name.trim() === '') {
        return setError("O nome é obrigatório.")
    }
    try {
      setError('')
      setLoading(true)
      const userCredential = await signup(email, password)
      await updateProfile(userCredential.user, { displayName: name }) 
      navigate('/')
    } catch (e) {
      setError('Falha ao criar a conta. Verifique os dados.')
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* 5. Adicione o campo de Nome ao formulário */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded-md" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 border rounded-md" />
          </div>
          <button disabled={loading} type="submit" className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <div className="mt-4 text-center">
          Já tem uma conta? <Link to="/login" className="text-orange-500 hover:underline">Faça login</Link>
        </div>
      </div>
    </div>
  )
}