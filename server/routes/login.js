const express = require('express');
const path = require('path');
const { fetchUserByEmail } = require('../models/db/features/Search');
const router = express.Router();
const csrfProtection = require('../middleware/csurf');
const { route } = require('.');

//rota GET para exibir o formuladiro
router.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname,'..','..','client', 'public', 'login.html'));
});

//rota POST para realizar a autenticacao do login
router.post('/', csrfProtection ,async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado!' });
        }

        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha incorreta!' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error('Erro durante o login:', err);
        return res.status(500).json({ error: 'Erro interno no servidor!' });
    }
});

module.exports = router;