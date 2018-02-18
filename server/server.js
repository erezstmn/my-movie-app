const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Movie} = require('./models/movie');

const app = express();
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

/////////////////////////////////////////////
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/movies', (req,res) => {
    let movie = new Movie({
        movie_name: req.body.movie_name,
        genre: req.body.genre,
        release_year: req.body.release_year
    });
    movie.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/',(req, res) => {
    res.send('test');
});
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});