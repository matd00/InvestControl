const pool = require('../connection/connectionPostgres')

async function fetchUserByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0]
    } catch (err) {
        console.error('Erro ao buscar usuário:', err.message);
        throw err;
    }
}

module.exports = { fetchUserByEmail };