const mariadb = require('mariadb');

const pool = mariadb.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5 
});

const getDb = async () => {
    return await pool.getConnection();
}

module.exports = getDb;