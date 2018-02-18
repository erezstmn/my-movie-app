const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
    movie_name: {
        type: String,
        required: true,
        minlength:1,
        trim: true
    },
    genre: {
        type: String,
        required: true
    },
    release_year:{
        type: Number,
        required: true
    },
    score: []
});

module.exports = {Movie};