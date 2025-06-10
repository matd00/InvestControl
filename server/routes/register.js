const express = require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcrypt');
const { AddUser } = require('../models/db/features/addToTable');
const { fetchUserByEmail } = require('../models/db/features/Search');
const validator = require('validator');
const csrfProtection = require('../middleware/csurf');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'register.html'));
});

router.post('/', csrfProtection, async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
    return res.status(400).json({ error: '"Não foi possível completar o registro. Verifique os dados e tente novamente.".' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres.' });
    }

    try {
        const existingUser = await fetchUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Não foi possível completar o registro. Verifique os dados e tente novamente.' });
        }
            // hash da senha //
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log('Senha original:', password);
        console.log('Senha com hash:', hashedPassword);

        const user = await AddUser(name, email, hashedPassword);

        res.status(201).json({ message:'Usuário registrado com sucesso! '});
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro interno ao registrar usuário' });
    }
});

module.exports = router;
