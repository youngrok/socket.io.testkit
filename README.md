# socket.io test & benchmark

## test case
  1. socket.io connect to localhost:8000
  1. send message 'show me the money'
  1. recieve message 'ok'
  1. send event 'custom client event', {event:'custom'}
  1. recieve event 'custom server event', {hello: 'world'}
  1. send event 'finish'
  1. server disconnect
  
## test run
	node testrunner.js [concurrency] [repeat count]
	
## server
The server should be prepared to execute test case above.

## test servers
### node socket.io
	npm install
	node server.js
	
### gevent-socketio
	pip install -r requirements.txt
	python gevent_server.py

  
