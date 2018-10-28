const express= require('express');
const path = require('path');
const fs = require('fs');
const app = new express();

const PORT = 3000
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', function (req, res) {
  res.send(fs.readFileSync(path.join(__dirname, '../dist/index.html')))
});

app.listen(PORT, () => {
  console.log(`server start at http://localhost:${PORT}`)
});