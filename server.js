io = require('socket.io').listen(8000);
io.configure(function() {
    io.enable('browser client etag')
    io.set('log level', 1)
    io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'])
});

io.sockets.on('connection', function(socket) {
    socket.emit('got_connected');
    socket.on('message', function(message) {
        if (message == 'show me the money') {
            socket.send('ok')
        }
    });
    socket.on('custom client event', function(data) {
        if (data.event == 'custom')
            socket.emit('custom server event', {hello:'world'})
    });

    socket.on('finish', function(data) {
        socket.disconnect()
    })
});

