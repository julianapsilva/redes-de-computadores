import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("127.0.0.1", 4444))

client.sendall(bytes("Conexão estabelecida com o servidor", 'UTF-8'))

while True:
    response = client.recv(1024)
    print("Resposta do servidor:", response.decode())
    request = input("Digite: ")
    client.sendall(bytes(request, 'UTF-8'))
    if request == 'quit':
      print("Você foi desconectado com sucesso :)")
      break
client.close()
