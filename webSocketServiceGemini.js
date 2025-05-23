// websocket_server.js
const WebSocket = require("ws")

// Crie uma instância do servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 }) // Porta onde o WebSocket irá escutar

// Objeto para gerenciar eventos personalizados
const eventEmitter = new (require("events").EventEmitter)()

// Lida com novas conexões de clientes
wss.on("connection", function connection(ws) {
  console.log("Cliente WebSocket conectado!")

  // Lida com mensagens recebidas do cliente (opcional, para esta lógica não é essencial)
  ws.on("message", function incoming(message) {
    console.log("Mensagem recebida do cliente:", message.toString())
  })

  // Lida com o fechamento da conexão
  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado.")
  })

  // Lida com erros
  ws.on("error", (error) => {
    console.error("Erro no WebSocket:", error)
  })
})

// Quando o evento 'postar' for acionado, faça um broadcast para todos os clientes conectados

postar = (data) => {
  console.log('Evento "postar" acionado! Fazendo broadcast:', data)
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "post_atualizado", payload: data }))
    }
  })
}
eventEmitter.on("postar", (data) => postar(data))

console.log("Servidor WebSocket rodando na porta 8080...")

// Exporte o eventEmitter para que a API Express possa acessá-lo
module.exports = eventEmitter
