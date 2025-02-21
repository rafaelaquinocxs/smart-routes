// routes/authRoutes.js
const express = require('express');
const { register, login, generateToken } = require('../controllers/ authController'); // Corrigido



const router = express.Router();

console.log('Auth routes carregadas!');

// Rota de registro
router.post('/register', register);

// Rota de login
router.post('/login', login);

// Rota para gerar token de teste
router.post('/generate-token', generateToken);

module.exports = router;
