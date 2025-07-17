import React, { useState } from 'react';
import * as api from '../services/api';
import { toast } from 'react-toastify';

function RegisterPage({ onSwitchToLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.register({ nome, email, password });
      toast.success('Registo bem-sucedido! Verifique o seu e-mail.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao registar.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Criar Conta</h2>
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