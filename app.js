var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var mqttHandler = require("./mqttHandler")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var mqttHandler = new mqttHandler()
mqttHandler.connect()

mqttHandler.mqttClient.on("message", (topic, payload) => {
  switch (topic) {
    case "localizacoes/persistir":
      console.log(JSON.stringify(payload))
      break
    case "localizacoes/persistida":
      console.log(JSON.stringify(payload))
      break
    case "Teste2":
      console.log("Agora, vai posta para o front consumir")
      break
    default:
      console.log("Não foi nenhum dos dois tópicos.")
  }
})
// Routes
app.post("/send-mqtt", function (req, res) {
  mqttHandler.mqttClient.publish("localizacoes/persistida", "persistiu!")
  res.status(201).send("Message sent to mqtt")
})

var server = app.listen(3000, function () {
  console.log("app running on port.", server.address().port)
})
