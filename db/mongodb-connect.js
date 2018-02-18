const MongoClient = require('mongodb').MongoClient;
const mongoPath = process.env.MONGODB_URI || 'mongodb://localhost:27017/MovieApp'

const connect = (movie) => { 
    MongoClient.connect(mongoPath, (err, client) => {
        if (err){
            return console.log('Unable to connect to server');
        }
        console.log('Connected to MongoDB server');
        const db = client.db('MovieApp');

        db.collection('MovieApp').insertOne(movie, (err, result) => {
            if (err){
                return console.log('Unable to insert movie', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        });


        client.close();
    });
};
const getMovies = (callback) => {
    let movies
    MongoClient.connect(mongoPath, (err, client) => {
        if (err){
            return console.log('Unable to connect to server');
        }
        console.log('Connected to MongoDB server');
        const db = client.db('MovieApp');
        db.collection('MovieApp').find().toArray().then((docs) => {
            // console.log(JSON.stringify(docs, undefined, 2));
            movies = docs;
            callback(movies);
        }, (e) =>{
            console.log('Unable to fetch movies', e);
        });
        // client.close();
    });
    
}
module.exports= {
    connect,
    getMovies
};