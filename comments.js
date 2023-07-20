// create web server
var express = require('express');
var app = express();

// create server
var server = require('http').createServer(app);

// create socket
var io = require('socket.io')(server);

// listen to port 3000
server.listen(3000);

// create array of comments
var comments = [
    {name: 'John', comment: 'Hello'},
    {name: 'Jack', comment: 'Hi'}
];

// use express to get static files
app.use(express.static('./public'));

// listen to connection
io.on('connection', function(socket) {
    // send comments to client
    socket.emit('sendComments', comments);

    // listen to addComment
    socket.on('addComment', function(data) {
        // add comment to array
        comments.push(data);

        // send updated comments to client
        io.sockets.emit('sendComments', comments);
    });
});