// need to connect to database and API
// create top song table if not exists columns( id, artistid, songURI?)
// iterate through lists of artists in js file or iterate through list of artists in db and request the api for the top songs of each artist
// use spotify-node library for requests to api?
// format top songs from artist into query to insert into db

const { pool } = require('./db.js');
const { lineup } = require('./bonnarooArtistIds.js');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv').config({path: '../.env'})

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientID: clientID,
  clientSecret: clientSecret,
  redirectUri: 'http://localhost:3000'
})

// data.body = {
  // tracks: [
    // {
      // id: string,
      // name: string,
    // },
    // {
      // id: string,
      // name: string,
    // },
    // ...
  // ]
// }

// token needs to be regenerated with a new session in client from login every 30 minutes or so
spotifyApi.setAccessToken('BQAN9KjrfkS1xFi26mUZTE06ulkfvJreQexlLFXmQcuKneUCz4IpEFCPF2sd7wlFWTVLsrwqK0tfb00M6q9Z2F2yChnsRC8PsTo9dZq_9DF8-XE4o9pT1YYfJGUzukQCZUcfImEX0OL03DsKyR-DcOamqBQbyL83s6ysGm4UPpcQstA-ZwIABI2WhQZGcLOI_QE2');

function removeSpecialChars(value) {
  const specialChars = /[\'\"\\\b\f\n\r\t\x00\x1a]/g;

  return value.replace(specialChars, '');
}

// MIGHT WANT TO REFACTOR TO STORE THE FULL URI SO I DONT HAVE TO CONCAT THE BEGGINNING OF URI TO EVERY TRACKID

// DONT FORGET TO GO BACK AND MAKE INDEXES

pool.connect((err, client, done) => {
  client.query('CREATE TABLE IF NOT EXISTS top_tracks(id SERIAL PRIMARY KEY, artist_spotify_id VARCHAR(100), track_name VARCHAR(200), track_id VARCHAR(100), FOREIGN KEY (artist_spotify_id) REFERENCES artists(spotify_id))')
    .then(() => {
      for (const artist in lineup) {
        spotifyApi.getArtistTopTracks(lineup[artist], 'US')
          .then((data) => {
            // console.log(lineup[artist])
            // console.log(data.body);
            let tracks = data.body.tracks;
            let artist_spotify_id = "'" + lineup[artist] + "'"

            for (let i = 0; i < tracks.length; i++) {
              let track_id = "'" + tracks[i].id + "'"
              let track_name = "'" + removeSpecialChars(tracks[i].name) + "'"
              // console.log(track_id)
              client.query(`INSERT INTO top_tracks(artist_spotify_id, track_name, track_id) VALUES (${artist_spotify_id}, ${track_name}, ${track_id})`)
                .then((result) => {
                  console.log('that worked');
                })
                .catch((err) => {
                  console.log('there was an error but ill figure it out', err)
                })
            }
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