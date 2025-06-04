const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Rotas do sistema
app.use('/', require('../routes/index'));
app.use('/dashboard', require('../routes/dashboard'));
app.use('/carteira', require('../routes/carteira'));
app.use('/relatorios', require('../routes/relatorios'));
app.use('/login', require('../routes/login'));
app.use('/register', require('../routes/register'));

module.exports = app;
