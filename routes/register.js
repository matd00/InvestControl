const express = require('express');
const router = express.Router();
const { AddUser } = require('../db/features/addToTable');
const { fetchUserByEmail } = require('../db/features/Search');
//dados que chegam do formlario via POST

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Dados recebidos:', req.body);
    try {
        const existingUser = await fetchUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }
        const user = await AddUser(name, email, password);
        res.status(201).json(user);
    } catch (err) {
        console.log('erro 500//register')
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

module.exports = router;