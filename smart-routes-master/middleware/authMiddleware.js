  const jwt = require('jsonwebtoken');

  const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Captura o token diretamente

    if (!token) {
      return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica e decodifica o token
      req.user = decoded.user;  // Adiciona o usuário ao request
      next(); // Continua para a próxima rota
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  };

  module.exports = authenticate;
