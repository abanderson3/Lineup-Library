const { pool } = require('./db');
const bonnarooArtists = require('./bonnarooArtistIds.js')

pool.connect((err, client, done) => {
  // create table artists if not exits
  // needs unique id
  // iterate through keys in object and for each key insert the key and value into sql table
})