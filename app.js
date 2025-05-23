// websocket-server-project/index.js
const WebSocket = require("ws")
const EventEmitter = require("events")
const express = require("express") // Adicionado Express
const bodyParser = require("body-parser") // Adicionado Body Parser

// --- WebSocket Server Setup ---
const appEventEmitter = new EventEmitter()
const wss = new WebSocket.Server({ port: 8080 }) // Porta do WebSocket

wss.on("connection", function connection(ws) {
  console.log("Cliente WebSocket conectado!")
  ws.on("message", function incoming(message) {
    console.log("Mensagem recebida do cliente:", message.toString())
  })
  ws.on("close", () => console.log("Cliente WebSocket desconectado."))
  ws.on("error", (error) => console.error("Erro no WebSocket:", error))
})

appEventEmitter.on("postar", (data) => {
  console.log(
    'Evento "postar" acionado no servidor WebSocket! Fazendo broadcast:',
    data
  )
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "post_atualizado", payload: data }))
    }
  })
})

console.log("Servidor WebSocket rodando na porta 8080...")

// --- Express API Endpoint for Internal Communication ---
const app = express() // Nova instância Express

app.use(bodyParser.json())

// Endpoint para a API Express externa chamar e acionar o evento 'postar'
app.post("/trigger-post-event", (req, res) => {
  const postData = req.body
  if (!postData || Object.keys(postData).length === 0) {
    return res
      .status(400)
      .json({ message: "Dados do post ausentes ou vazios." })
  }

  console.log("Requisição interna para /trigger-post-event recebida:", postData)
  appEventEmitter.emit("postar", postData) // Aciona o evento interno

  res.status(200).json({ message: 'Evento "postar" disparado com sucesso!' })
})

module.exports = app

// Não precisa mais exportar o eventEmitter se a comunicação for por HTTP
// module.exports = { appEventEmitter };
