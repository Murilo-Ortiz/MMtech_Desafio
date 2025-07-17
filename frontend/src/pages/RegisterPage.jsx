import React, { useState } from 'react';
import * as api from '../services/api';
import { toast } from 'react-toastify';

function RegisterPage({ onSwitchToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.register({ nome, email, password });
      toast.success('Registo bem-sucedido! Verifique o seu e-mail.');
      setNome('');
      setEmail('');
      setPassword('');
    
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao registar.');
      console.error(err);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-app-header">Agenda de Contatos MMTech</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Criar Conta</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading? 'Aguarde...' : 'Registrar'}
        </button>

        {loading && <div className="loader"></div>}
        
        <p className="switch-form">
          Já tem uma conta?{' '}
          <button type="button" onClick={onSwitchToLogin} className="link-button">
            Faça login
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;