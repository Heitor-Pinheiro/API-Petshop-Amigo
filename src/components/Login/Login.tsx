import React, { useState } from 'react';
import { Dog, Lock, User, Loader2 } from 'lucide-react';
import './Login.css';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/login', { username, password });
      onLoginSuccess();
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Usuário ou senha incorretos.');
      } else {
        setError('Erro ao conectar com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Dog size={32} className="login-icon" />
          </div>
          <h2>Área Restrita</h2>
          <p>Faça login para acessar o sistema.</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="username">Usuário</label>
            <div className="login-input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="login-form-group">
            <label htmlFor="password">Senha</label>
            <div className="login-input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary login-button" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={18} /> : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};
