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
};



// const getTopSongsOfSelectedArtists = (req, res) => {
//   console.log('dbQ', req.query.artistIds)
//   let top_tracks = []
//   pool.connect((err, client, done) => {
//     const artistIds = req.query.artistIds

//     for (let i = 0; i < artistIds.length; i++) {
//       let id = "'" + artistIds[i] + "'"
//       // console.log('id', id)
//       client.query(`SELECT json_agg(top_tracks.track_id) AS top_tracks FROM artists LEFT JOIN top_tracks ON top_tracks.artist_spotify_id = artists.spotify_id WHERE artists.spotify_id =  ${id}`)
//         .then((result) => {
//           console.log(result.rows[0])
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//     console.log("tt", top_tracks)
//     done()
//   })
// }

const getTopSongsOfSelectedArtists = (req, res) => {
  console.log('dbQ', req.query.artistIds)
  const artistIds = req.query.artistIds
  const promises = []

  for (let i = 0; i < artistIds.length; i++) {
    const id = artistIds[i]
    const query = {
      text: 'SELECT json_agg(top_tracks.track_id) AS top_tracks FROM artists LEFT JOIN top_tracks ON top_tracks.artist_spotify_id = artists.spotify_id WHERE artists.spotify_id = $1',
      values: [id]
    }
    const promise = pool.query(query)
      .then((result) => {
        console.log(result.rows[0])
        return result.rows[0]
      })
      .catch((err) => {
        console.log(err)
      })
    promises.push(promise)
  }

  Promise.all(promises)
    .then((results) => {
      console.log(results)
      res.send(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: 'An error occurred while querying the database.' })
    })
}

module.exports = { getAllBonnarooArtists, getTopSongsOfSelectedArtists }