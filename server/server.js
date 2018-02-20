const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Movie} = require('./models/movie');

const app = express();
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3001;

/////////////////////////////////////////////
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PATCH");
    next();
  });

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
app.get('/movies', (req,res) => {
    let movie = req.query.movie_name;   
    Movie.findOne({
        "movie_name": movie
    })
    .then((movie) => {
        res.send({movie});
    }, (e) => {
        res.status(400).send(e);
    })
});
app.get('/movies/search', (req, res) => {
    let genreToMatch = req.query.genre;
    let fromYear = req.query.from -1;
    let toYear = req.query.to +1;
    
    Movie.find({
        genre: genreToMatch,
        release_year:{
            $gt: fromYear,
            $lt: toYear
        }
    })
    .then((movies) => {
        res.send({movies});
    }, (e) => {
        res.status(400).send(e);
    })
});
app.patch('/movies/', (req,res) => {
    let movie = req.query.movie_name; 
    let newScore = req.query.score;
    Movie.findOneAndUpdate({
        movie_name: movie
    },{
        $push: {
            score: newScore
        }
    },{
        returnOriginal: false
    }). then((result) => {
        res.send({result});
    }, (e) =>{
        res.status(400).send(e);
    })
});
// app.get('/movies/:name', (req, res) => {
//     let name =  req.params.name;
//     let score = req.params.score;
//     console.log(name, score);
// })
// .then((movie) => {
//     res.send({movie});
// }, (e) => {
//     res.status(400).send(e);
// })
app.get('/',(req, res) => {
    res.send('test');
});
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});