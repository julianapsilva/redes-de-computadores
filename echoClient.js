var socket = require('socket.io-client')('http://localhost:4444');
const repl = require('repl')
let username = null

socket.on('disconnect', function () {
    socket.emit('disconnect')
});
socket.on('connect', () => {
    console.log('=== Conversa iniciada ===')
    username = process.argv[2]
})
socket.on('message', (data) => {
    const { cmd, username } = data
    console.log(username + ': ' + cmd.split('\n')[0]);
})
repl.start({
    prompt: '',
    eval: (cmd) => {
        console.log('chegou aq', cmd)
        socket.send({ cmd, username })
    }
})

