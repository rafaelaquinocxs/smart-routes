const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Rotas e middlewares existentes
const connectDB = require('./config/db'); // Mantendo para compatibilidade, mas não utilizado diretamente
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const deviceRoutes = require('./devices/routes/deviceRoutes');
const isAdmin = require('./middleware/isAdmin');

// Importação das novas models (opcional, para garantir que sejam registradas ao iniciar o app)
require('./models/User');
require('./models/Container');
require('./models/Trip');
require('./models/Points');

// Configuração de variáveis de ambiente
dotenv.config();

// Função para conectar ao MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-routes';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
});

// Inicialização do servidor
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

console.log('Carregando rotas...');

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/admin', isAdmin, adminRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api', deviceRoutes);

// Rota de teste
app.get('/api/test', (req, res) => {
    res.send('API funcionando');
});

// Configuração da porta
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
