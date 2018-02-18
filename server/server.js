const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoDB = require('../db/mongodb-connect');

const app = express();
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.get('/',(req, res) => {
    res.send('test');
});
app.use(bodyParser.json());
app.post('/movies', (req, res) => {
    console.log(req.body);
    MongoDB.connect(req.body);
    res.status(200).send('test');
});
app.get('/movies', (req, res) => {
    let moviesToShow;
    MongoDB.getMovies((movies) => {
        console.log(JSON.stringify(movies,undefined, 2));
        moviesToShow = JSON.stringify(movies,undefined, 2);
        res.status(200).send(moviesToShow);
    });
    
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});