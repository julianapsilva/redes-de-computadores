const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 4444
io.on('connection', (socket) => {
    console.log('connected')
    socket.on('message', (evt) => {
        socket.emit('message', evt)
    })
})
io.on('disconnect', (evt) => {
    console.log('disconnected')
})
http.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`))