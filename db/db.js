const { Pool } = require('pg');
cosnt dotenv = require('doteng').config()

const dbPW = process.env.DB_PW;
const dbPORT = process.env.DB_PORT

const pool = new Pool({
  user: 'bryce',
  database: 'festival_playlist',
  password: dbPW,
  port: Number(dbPORT),
  host: 'localhost'
})

module.exports = { pool }