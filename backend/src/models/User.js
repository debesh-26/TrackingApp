const pool = require('../config/db');

module.exports = {
  async create(username, hashedPassword) {
    console.log('Creating user with username:', username, 'and password:', hashedPassword);
  
  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    console.log('User created successfully');
  } catch (error) {
    console.error('Error inserting user into database:', error);
    throw error;
  }
  },

  async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query('SELECT id, username FROM users');
    return result.rows;
  },
};