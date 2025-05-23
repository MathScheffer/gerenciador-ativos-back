const WebSocket = require("ws")

function onError(ws, err) {
  console.error(`onError: ${err.message}`)
}

function onMessage(ws, data) {
  console.log(`onMessage: ${data}`)
  ws.send(`recebido!`)
}

function onConnection(ws, req) {
  ws.on("message", (data) => onMessage(ws, data))
  ws.on("error", (error) => onError(ws, error))
  console.log(`onConnection`)
}

function broadcast(wss, jsonObject) {
  if (!wss.clients) return
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(jsonObject))
    }
  })
}
module.exports = (server) => {
  const wss = new WebSocket.Server({
    server,
  })

  wss.on("connection", onConnection)
  wss.broadcast = (obj) => broadcast(wss, obj)
  setInterval(() => {
    wss.broadcast({ time: new Date() })
  }, 10000)
  console.log(`App Web Socket Server is running!`)
  return wss
}
