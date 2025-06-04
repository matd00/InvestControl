const pool = require('../connection/connectionPostgres');

async function fetchAllUsers() {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log(result.rows)
        return result.rows
    } catch (err) {
        console.error('Erro ao buscar users', err);
        throw err; 
    }
}

fetchAllUsers()
module.exports = { fetchAllUsers };