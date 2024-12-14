const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'postgres', 
  password: 'qaz1wsx2@',
  port: 5432,
});

module.exports = pool;