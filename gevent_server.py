from gevent import monkey; monkey.patch_all()
from socketio import socketio_manage
from socketio.server import SocketIOServer
from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin


class ChatNamespace(BaseNamespace, RoomsMixin, BroadcastMixin):
    
    def on_custom_client_event(self, data):
        if data[u'event'] == u'custom':
            self.emit('custom server event', {'hello':'world'})

    def on_finish(self):
        self.disconnect()

    def recv_message(self, data):
        if data == 'show me the money':
            self.send('ok')

class Application(object):
    def __init__(self):
        self.buffer = []

    def __call__(self, environ, start_response):
        socketio_manage(environ, {'': ChatNamespace})

def not_found(start_response):
    start_response('404 Not Found', [])
    return ['<h1>Not Found</h1>']


if __name__ == '__main__':
    print 'Listening on port 8000 and on port 843 (flash policy server)'
    SocketIOServer(('127.0.0.1', 8000), Application(), namespace="socket.io", policy_server=False).serve_forever()
