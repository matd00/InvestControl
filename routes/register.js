const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { AddUser } = require('../db/features/addToTable');
const { fetchUserByEmail } = require('../db/features/Search');
const validator = require('validator');
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres.' });
    }

    try {
        const existingUser = await fetchUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }
            // hash da senha //
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log('Senha original:', password);
        console.log('Senha com hash:', hashedPassword);

        const user = await AddUser(name, email, hashedPassword);

        res.status(201).json(user);
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro interno ao registrar usuário' });
    }
});

module.exports = router;
