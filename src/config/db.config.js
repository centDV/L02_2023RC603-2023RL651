const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',         
    database: 'blogDB',       
    password: 'catolica10', 
    port: 5432,
    max: 20,                   
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000, 
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client from pool:', err.stack);
    }
    console.log('Successfully connected to the PostgreSQL database: blogDB');
    client.release(); 
});

module.exports = {
    pool,
};