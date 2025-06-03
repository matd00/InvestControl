const express = require('express');
const path = require('path');

const app = express();

// Serve tudo que estiver dentro de /public (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve o index.html na root /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;

app.use('/', require('../routes/index'));
app.use('/dashboard', require('../routes/dashboard'));
app.use('/carteira', require('../routes/carteira'));
app.use('/relatorios', require('../routes/relatorios'));
app.use('/login', require('../routes/login'));
