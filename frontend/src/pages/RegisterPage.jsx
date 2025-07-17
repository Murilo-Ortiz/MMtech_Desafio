import React, { useState } from 'react';
import * as api from '../services/api'; 

function RegisterPage({ onSwitchToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.register({ nome, email, password });
      setSuccess('Registo bem-sucedido! Verifique o seu e-mail para ativar a sua conta.');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registar. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Criar Conta</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registar</button>
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
