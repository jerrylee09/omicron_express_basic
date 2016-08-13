var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var validate = require('./validation.js');

var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

/**
 * POST /songs
 *
 * Places song into songs array
 */

// app.use('/songs', validate);

app.post('/songs', function(req, res) {
  var addDate = new Date();
  var song = req.body;
  var check = false;
  var duplication = false;
  if (song.title == '' || song.artist == '') {
      // res.status(400).send('Please insert title');
      console.log('please insert name');
      check = true;
  }
  for (var i = 0; i < songs.length; i++) {
      if (song.title === songs[i].title && song.artist === songs[i].artist) {
          console.log('please insert name1');
          duplication = true;
      }
  }
  if (check === true || duplication === true) {
      res.sendStatus(400);
      console.log('return date', duplication);
  } else {
      console.log(song);
      res.sendStatus(200);
      songs.push(song);
  }
});

app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  console.log('What is in req.params[0]?', req.params[0]);

  //console.log('dirname: ', __dirname);
  //console.log('path', path.join(__dirname, '../public', file));
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
