
// SOCKET IO bench
var io = require('socket.io-client');

var opts = {
    transports: ['websocket'],
    'force new connection': true // undocumented option
};

function testClient(callback) {
    var socket = io.connect('http://localhost:8000', opts);
    socket.on('connect', function(){
        socket.send('show me the money');
    });
    socket.on('message', function( message) {
        if (message == 'ok')
            socket.emit('custom client event', {'event':'custom'})
    });
    socket.on('custom server event', function(data) {
        if (data.hello == 'world')
            socket.emit('finish')
    });
    socket.on('disconnect', function(){
        callback()
    });

    return socket;
}


module.exports = { testClient:testClient };