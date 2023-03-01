const { Pool } = require('pg');
const dotenv = require('dotenv').config({path: '../.env'})

const dbPW = process.env.DB_PW;
const dbPORT = process.env.DB_PORT;

// console.log(dbPW, dbPORT)

const pool = new Pool({
  user: 'bryce',
  database: 'festival_playlist',
  password: dbPW,
  port: Number(dbPORT),
  host: 'localhost'
})

module.exports = { pool }