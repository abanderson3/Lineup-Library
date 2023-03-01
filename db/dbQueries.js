const { pool } = require('./db.js');

const getAllBonnarooArtists = (req, res) => {
  pool.connect((err, client, done) => {
    client.query("SELECT json_build_object('name', artists.name, 'spotify_id', artists.spotify_id, 'popularity', artists.popularity, 'genres', json_agg(DISTINCT genres.genre)) FROM artists LEFT JOIN genres ON artists.spotify_id = genres.artist_spotify_id GROUP BY artists.id")
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log(err);
    })
    done()
  })
}

module.exports = { getAllBonnarooArtists }