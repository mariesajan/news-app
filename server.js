const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

var json = fs.readFileSync(path.join(__dirname, "static",  "data.json"));

app.use(express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getJSON', (req, res) => {
  if(json){
      res.send(JSON.parse(json));
  }
});

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is listening ...');
});
