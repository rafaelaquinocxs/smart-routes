import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Função para verificar se o usuário é administrador
  const checkAdminStatus = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Você precisa estar autenticado para acessar o painel administrativo');
      navigate('/login');
      return;
    }

    const response = await fetch('http://localhost:5000/api/admin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setIsAdmin(data.isAdmin); // Assume que o backend retorna o status de admin
    } else {
      alert('Você não tem permissão para acessar esta página');
      navigate('/devices'); // Redireciona para a página de dispositivos caso não seja admin
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <div>
      <h2>Painel Administrativo</h2>
      {isAdmin ? (
        <div>
          <p>Bem-vindo ao painel de administração!</p>
          {/* Aqui você pode adicionar mais funcionalidades, como gerenciar dispositivos, usuários, etc. */}
        </div>
      ) : (
        <p>Você não tem permissão para acessar esta página.</p>
      )}
    </div>
  );
}

export default AdminPage;
