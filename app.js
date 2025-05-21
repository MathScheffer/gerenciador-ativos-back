/* const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 */
require("dotenv").config()
const { WebSocket } = require("ws")

const wss = new WebSocket.Server({
  port: process.env.PORT,
})

const broadcast = (server, jsonObject) => {
  //this.clients é pega dentro do servidor já ativo, pois esta função será colocada lá.
  if (!server.clients) return
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      //envia para o cliente o jsonObj
      client.send(JSON.stringify(jsonObject))
    }
  })
}
const onMessage = (ws, data) => {
  console.log(data.toString())

  //Quando usamos o cliente, mandamos para o websocket dele a mensagem!
  ws.send("Sua mensagem foi recebida!")
}

const onError = (err) => {
  console.error(err)
}
// eventos
wss.on(
  "connection",
  //ws = canal de comunicação (conexao com o cliente)
  //req = objeto da requisição, sendo possível acessar headers, ips, etc
  (onConnection = (ws, req) => {
    const ip = req.socket.remoteAddress
    console.log(`Usuario ${ip} conectado`)
    //cada vez que o cliente disparar o evento message...
    ws.on("message", (data) => onMessage(ws, data))
    ws.on("error", (error) => onError(error))
  })
)

wss.broadcast = (obj) => broadcast(wss, obj)

setInterval(() => {
  wss.broadcast({ time: new Date() })
}, 5000)
console.log(`Websocket server running on ${process.env.PORT}`)
