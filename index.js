const express = require("express");

let app = express();
app.use(express.json())
// app.use(express.static)

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log("[server] listening on port 3000")
})