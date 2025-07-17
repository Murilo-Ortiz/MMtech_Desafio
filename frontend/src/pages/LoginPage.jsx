import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Falha no login. Verifique as suas credenciais ou se o seu e-mail foi verificado.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
        <button type="submit">Entrar</button>
        <p className="switch-form">
          Não tem uma conta?{' '}
          <button type="button" onClick={onSwitchToRegister} className="link-button">
            Registe-se
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
