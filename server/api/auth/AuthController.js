const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { fetchUserByEmail } = require('../../models/db/features/Search');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado!' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
        return res.status(400).json({ error: 'Senha incorreta!' });
            }
      // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
            { expiresIn: '2h' }
    );
        return res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error('Erro durante o login:', err);
            return res.status(500).json({ error: 'Erro interno no servidor!' });
    }
}
}

module.exports = AuthController;