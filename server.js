const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const deviceRoutes = require('./devices/routes/deviceRoutes');
const isAdmin = require('./middleware/isAdmin');

dotenv.config();

connectDB().then(() => {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    console.log('Carregando rotas...');

    // Rotas
    app.use('/api/auth', authRoutes);
    app.use('/api/admin', isAdmin, adminRoutes);
    app.use('/api/devices', deviceRoutes);

    app.get('/api/test', (req, res) => {
        res.send('API funcionando');
    });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
});
