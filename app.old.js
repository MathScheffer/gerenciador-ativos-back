const express = require("express")
const WebSocket = require("ws")

const ws = new WebSocket("ws://localhost:3000")

const cors = require("cors")

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))

app.use(express.json())

ws.on("message", () => {
  console.log("Mensagem recebida!")
})

ws.on("postar", (data) => {
  console.log(data)
})

app.post("/login", (req, res, next) => {
  res.json({ token: "123456" })
  ws.emit("postar", "testando retorno do topico")
})

module.exports = app
