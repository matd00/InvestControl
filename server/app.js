const express = require('express');
const path = require('path');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Muitas requisições do mesmo IP. Tente novamente mais tarde.'
});
app.use(limiter);

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

// Rota para fornecer o token CSRF 
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Rotas do sistema
app.use('/', csrfProtection, require('./routes/index'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/carteira', require('./routes/carteira'));
app.use('/relatorios', require('./routes/relatorios'));
app.use('/login', require('./routes/login'));
app.use('/register', csrfProtection, require('./routes/register'));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Algo deu errado. Por favor, tente novamente mais tarde.' });
});

module.exports = app;
