
// SOCKET IO bench
var io = require('socket.io-client');

var opts = {
    transports: ['websocket'],
    'force new connection': true // undocumented option
};
var messageSent = 0;
function testClient(callback, count) {
    var socket = io.connect('http://localhost:8000', opts);
    socket.on('connect', function(){
//        console.log('show me the money');
        socket.send('show me the money');
    });
    socket.on('message', function( message) {
        if (message == 'ok') {
            messageSent ++;
            if (messageSent == count) {
//                console.log('custom client event');
                socket.emit('custom client event', {'event':'custom'});
            } else {
//                console.log('show me the money');
                socket.send('show me the money');
            }
        }
    });
    socket.on('custom server event', function(data) {
//        console.log('finish');
        if (data.hello == 'world')
            socket.emit('finish')
    });
    socket.on('disconnect', function() {
//        console.log('disconnect')
        callback()
    });

    return socket;
}


module.exports = { testClient:testClient };