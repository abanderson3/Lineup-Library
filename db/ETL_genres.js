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
  client.query('CREATE TABLE IF NOT EXISTS genres(artist_spotify_id VARCHAR(100), genre VARCHAR(100), FOREIGN KEY (artist_spotify_id) REFERENCES artists(spotify_id))')
    .then(() => {
        for (const artist in lineup) {
          spotifyApi.getArtist(lineup[artist])
            .then((result) => {
              // console.log(result.body);
              let artist_spotify_id = "'" + lineup[artist] + "'"
              let genres = result.body.genres;
              if (genres.length > 0) {
                for (let i = 0; i < genres.length; i++) {
                  let genre = "'" + genres[i] + "'"
                  client.query(`INSERT INTO genres(artist_spotify_id, genre) VALUES (${artist_spotify_id}, ${genre})`)
                    .then(() => {
                      console.log('genres added')
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
              } else {
                client.query(`INSERT INTO genres(artist_spotify_id, genre) VALUES (${artist_spotify_id}, 'Not Available')`)
                  .then(() => {
                    console.log('No genres to add');
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }


            })
            .catch((err) => {
              console.log(err);
            })
        }
    })
    done();
})




// spotifyApi.getArtist('4IsiG6RpDyRq6Frd2CvddW')
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.log(err);
//   })