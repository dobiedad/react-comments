var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));
var server =  app.listen(1234, function () {
  console.log('listening on port 1234!');
});

module.exports = server;
