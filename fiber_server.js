require('fibers')

io = require('socket.io').listen(8000);
io.configure(function() {
    io.enable('browser client etag')
    io.set('log level', 1)
    io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'])
});

io.sockets.on('connection', function(socket) {
    socket.emit('got_connected');
    socket.on('message', function(message) {
        Fiber(function() {
            if (message == 'show me the money') {
                socket.send('ok')
            }
        }).run()
    });
    socket.on('custom client event', function(data) {
        Fiber(function() {
            if (data.event == 'custom')
                socket.emit('custom server event', {hello:'world'})
        }).run()
    });

    socket.on('finish', function(data) {
        Fiber(function() {
            socket.disconnect()
        }).run()
    })
});

