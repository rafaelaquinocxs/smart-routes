const User = require('../models/User');  // Certifique-se de que está importando o modelo corretamente
const jwt = require('jsonwebtoken');

// Função para gerar um token JWT de teste
exports.generateToken = async (req, res) => {
  const { username, role } = req.body;

  try {
    // Gerando o token manualmente com os dados fornecidos
    const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });  // Retornando o token gerado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar token' });
  }
};

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  console.log("Dados recebidos:", req.body); // Isso irá imprimir os dados enviados na requisição
  const { username, password, role } = req.body;

  // Verificando se os campos obrigatórios foram recebidos
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Campos faltando: username, password ou role' });
  }

  // Verificando se o usuário já existe
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criando o usuário com a senha em texto simples
    const user = await User.create({ username, password, role });
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar o usuário' });
  }
};

// Função para login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentativa de login:', username);

  try {
    // Verificando se o usuário existe
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    console.log('Senha Recebida:', password);
    console.log('Senha no Banco:', user.password);

    // Comparando a senha em texto simples
    if (password !== user.password) return res.status(400).json({ error: 'Senha incorreta' });

    // Gerando um token JWT para o login
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
