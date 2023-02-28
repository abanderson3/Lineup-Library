const express = require("express");
const path = require('path');
const dotenv = require('dotenv').config()
const request = require('request')
const querystring = require('querystring')

let app = express();
const PORT = process.env.PORT
const DIST_DIR = path.join(__dirname, './dist');
const HTML = path.join(DIST_DIR, 'index.html');
app.use(express.json())
app.use(express.static(DIST_DIR))


let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/callback'




app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)


app.listen(3000, () => {
  console.log("[server] listening on port 3000")
})