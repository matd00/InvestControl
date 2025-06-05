const express = require('express');
const path = require('path');
const { fetchUserByEmail } = require('../models/db/features/Search');
const { use } = require('react');
const { error } = require('console');
const router = express.Router();

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

//chave para token JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','..','client', 'public', 'login.html'));
});

//rota POST para realizar a autenticacao do login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Usuario nao encontrado!' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Erro no ao buscar pelo usuario !' + err});
    }
        // comparando senha com senha do db //
    try {
    // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
    const match = await bcrypt.compare(password, user.password);
    // Se as senhas não corresponderem, retorna erro
    if (!match) {
        return res.status(400).json({ error: 'Senha Incorreta' });
    }

        const token = jwt.sign(
        { userId: user.id, email: user.email },  
        JWT_SECRET,                              
        { expiresIn: '1h' }                      
    );
        
    res.status(200).json({ message: 'Login bem-sucedido' });

} catch (err) {
    // Se ocorrer algum erro ao comparar as senhas, retorna erro genérico
    return res.status(400).json({ error: 'Erro ao comparar senhas!' });
    }
});

module.exports = router;



//
