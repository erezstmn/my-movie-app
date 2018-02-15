const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath));
app.get('/',(req, res) => {
    res.send('test');
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});