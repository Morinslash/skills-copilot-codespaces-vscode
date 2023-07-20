// create web server with one get route returning "hello world"
// run server and access route in browser

// create a web server
const express = require('express');
const app = express();

// create a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// listen on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// run the server
// node comments.js
// open browser and go to http://localhost:3000/