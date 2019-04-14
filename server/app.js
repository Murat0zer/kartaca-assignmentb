const http = require('http');
const port = 3000;
const converter =  require('./util/converter.js');

const requestHandler = (request, response) => {
    console.log(request.url);
    response.end('Hello !')
};

const server = http.createServer(requestHandler);


let clients = [];
// Loading socket.io
let io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    clients.push(socket);

    socket.on('disconnect', function (socket) {
        console.log('A client is disconnected!');
        let i = clients.indexOf(socket);
        clients.splice(i, 1);
    });

    socket.on('message', function (message) {
        console.log(message);
        message.convertedValue = converter.convertValue(message.value, message.convertMode);
        console.log(message.convertedValue);
        socket.emit('message', message);
    });

});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad \`', err)
    }

    console.log(`server is listening on ${port}`)
});
