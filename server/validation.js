var express = require('express');
var router = express.Router();

var songs = []; //stores our songs

router.post('/', function(req, res) {
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
        if (song.title === songs[i].title || song.artist === songs[i].artist) {
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

router.get('/', function (req, res) {
  res.send(songs);
});



module.exports = router;