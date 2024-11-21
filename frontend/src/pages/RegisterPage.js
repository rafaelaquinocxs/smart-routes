import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      role: role,
    };
    console.log("Data being sent:", data);
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro desconhecido');
      } else {
        const result = await response.json();
        console.log(result);
        alert('Usuário registrado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setErrorMessage('Erro ao tentar registrar o usuário. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cargo"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
