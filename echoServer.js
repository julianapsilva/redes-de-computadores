const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 4444

io.on('connection', (socket) => {
    console.log('connected')
    socket.on('message', (evt) => {
        if(evt.cmd.startsWith('echo'))
            socket.emit('message', evt.cmd.split(' ').pop())
        else if (evt.cmd.startsWith('quit')) {
            socket.emit('teste')
            socket.disconnect()
        }
    })
})
io.on('teste', (evt) => {
    console.log('disconnected')
})
http.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`))