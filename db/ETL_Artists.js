const { pool } = require('./db.js');
const { lineup } = require('./bonnarooArtistIds.js')

const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv').config({path: '../.env'})

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientID: clientID,
  clientSecret: clientSecret,
  redirectUri: 'http://localhost:3000'
})

// token needs to be regenerated with a new session in client from login every 30 minutes or so
spotifyApi.setAccessToken('BQAN9KjrfkS1xFi26mUZTE06ulkfvJreQexlLFXmQcuKneUCz4IpEFCPF2sd7wlFWTVLsrwqK0tfb00M6q9Z2F2yChnsRC8PsTo9dZq_9DF8-XE4o9pT1YYfJGUzukQCZUcfImEX0OL03DsKyR-DcOamqBQbyL83s6ysGm4UPpcQstA-ZwIABI2WhQZGcLOI_QE2');


// DONT FORGET TO GO BACK AND MAKE INDEXES

pool.connect((err, client, done) => {
  // create table artists if not exits
  // needs unique id
  // iterate through keys in object and for each key insert the key and value into sql table

  client.query('CREATE TABLE IF NOT EXISTS artists(id SERIAL PRIMARY KEY, name VARCHAR(50), spotify_id VARCHAR(100) UNIQUE, popularity INT)')
    .then(() => {
      for (let artist in lineup) {
        let singleArtist = "'" + artist + "'"
        let artistID = "'" + lineup[artist] + "'"
        spotifyApi.getArtist(lineup[artist])
          .then((results) => {
            let popularity = results.body.popularity
            client.query(`INSERT INTO artists(name, spotify_id, popularity) VALUES (${ singleArtist }, ${ artistID }, ${popularity})`)
              .then((results) => {
                console.log('It worked');
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  done();
})


