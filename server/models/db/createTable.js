const pool = require('./connectionPostgres')

async function createTables() {
try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (

        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
    );`
    );
    console.log('Tabela criada com sucesso.');
} catch (err) {
    console.error('Erro ao criar tabela:', err);
} finally {
    pool.end(); 
}
}

createTables();