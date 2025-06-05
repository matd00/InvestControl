const pool = require('../connectionPostgres');

async function AddUser(name, email, password) {
    try {
        const result = await pool.query(
            'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING * ',
            [name, email, password]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error occurred while adding users:', err.message);
        throw err;
    }
}

module.exports = { AddUser };
