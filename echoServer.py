
import socket
import threading
PORT = 4444


class HandleThread(threading.Thread):
    def __init__(self, clientsocket):
        threading.Thread.__init__(self)
        self.client = clientsocket
        print("Novo cliente conectado.")

    def run(self):
        self.client.send(bytes("Servidor conectado com sucesso", 'utf-8'))
        request = ''
        while True:
            payload = self.client.recv(2048)
            request = payload.decode()

            if request == 'quit':
                print("Cliente desconectado")
                break
            elif request.startswith(('echo', 'ECHO')):
                response = request.split(" ") 
                response.pop(0)
                response = " ".join(response)
                self.client.send(bytes(response, 'UTF-8'))
            else:
                if(request != "Conexão estabelecida com o servidor"):
                    response = "Comando invalido"
                    self.client.send(bytes(response, 'UTF-8'))


app = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
app.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
app.bind(("127.0.0.1", PORT))
print(f"Servidor iniciado na porta {PORT}..")

while True:
    app.listen(1)
    clientsock, address = app.accept()
    thread = HandleThread(clientsock)
    thread.start()
