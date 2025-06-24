var express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
const localizacoesService = require("./service/localizacaoService")
const MqttHandler = require("./mqttHandler")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const mqttClientInstance = new MqttHandler()
mqttClientInstance.connect()
mqttClientInstance.mqttClient.on("message", (topic, payload) => {
  try {
    const body = JSON.parse(payload.toString())
    body.data_entrada = Date.now()
    switch (topic) {
      case "localizacoes/persistir":
        localizacoesService.criar(body, (err, localizacao) => {
          if (err) {
            mqttClientInstance.mqttClient.publish(
              "localizacoes/persistida",
              JSON.stringify({
                msg: "Houve um erro ao persistir!",
                erro: err,
              })
            )
          } else {
            mqttClientInstance.mqttClient.publish(
              "localizacoes/persistida",
              JSON.stringify({
                message: "Dados persistidos!",
                body: JSON.stringify(localizacao),
              })
            )
          }
        })
        console.log(JSON.parse(payload.toString()))
        break
      case "localizacoes/persistida":
        console.log("uhu")
        break
      case "Teste2":
        console.log("Agora, vai posta para o front consumir")
        break
      default:
        console.log("Não foi nenhum dos dois tópicos.")
    }
  } catch (err) {
    console.log("erro no mqtt")
  }
})
// Routes
app.post("/send-mqtt", function (req, res) {
  mqttClientInstance.mqttClient.publish("localizacoes/persistida", "persistiu!")
  res.status(201).send("Message sent to mqtt")
})

const localizacoes = require("./rotas/localizacoesRotas")
app.use("/api/localizacao", localizacoes)

const local = require("./rotas/localRotas")
app.use("/api/local", local)

const ativo = require("./rotas/ativoRotas")(mqttClientInstance)
app.use("/api/ativo", ativo)

/**
 * const usuario = require('./rotas/usuarioRotas')
 * app.use("/api/usuario", usuario)
 */
var server = app.listen(3000, function () {
  console.log("app running on port.", server.address().port)
})
