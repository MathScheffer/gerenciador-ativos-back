const WebSocket = require("ws")

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

onMessage = (ws, data) => {
  ws.send("sua mensagem foi enviada!")
  wss.broadcast("teste")
}

onError = (ws, err) => {
  console.error(err)
}

onConnection = (ws, req) => {
  ws.on("message", (data) => onMessage(ws, data))
  ws.on("error", (error) => onError(ws, error))
  ws.on("postar", (data) => onPostar(ws, data))
  console.log("onConnection acionado!")
}

module.exports = (server) => {
  const wss = new WebSocket.WebSocketServer({ server })

  wss.on("connection", onConnection)

  wss.on("postar", (data) => onPostar(ws, data))
  wss.broadcast = (obj) => broadcast(wss, obj)

  setInterval(() => {
    wss.broadcast({ time: new Date() })
  }, 5000)
  console.log(`WebSocket conectado!`)

  return wss
}
