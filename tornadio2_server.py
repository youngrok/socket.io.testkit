import tornado
import tornadio2

class MyConnection(tornadio2.SocketConnection):
    def on_message(self, message):
        if message == 'show me the money':
            self.send('ok')

    @tornadio2.event('custom client event')
    def custom(self, event):
        if event == 'custom':
            self.emit('custom server event', {'hello': 'world'})

    @tornadio2.event('finish')
    def bye(self):
        self.close()

router = tornadio2.TornadioRouter(MyConnection)
application = tornado.web.Application(router.urls, socket_io_port=8000)

if __name__ == "__main__":
    socketio_server = tornadio2.server.SocketServer(application)
