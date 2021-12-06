var socket = require('socket.io-client')('http://localhost:4444');
const repl = require('repl')
let username = null

socket.on('teste', function () {
    // socket.emit('disconnect')
    socket.disconnect()
    process.exit()

});
socket.on('connect', () => {
    console.log('=== Conversa iniciada ===')
    username = process.argv[2]
})
socket.on('message', (data) => {
    console.log('Resposta do servidor:', data);
})
repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({ cmd, username })
    }
})

