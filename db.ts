const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: 'nodechat',
});


module.exports = pool;