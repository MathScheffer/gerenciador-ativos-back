const mqtt = require("mqtt")
const { EventEmitter } = require("ws")
require("dotenv").config()

class MqttHandler {
  constructor() {
    //super()
    this.host = process.env.BROKER
    this.username = process.env.BROKER_USER // mqtt credentials if these are needed to connect
    this.password = process.env.BROKER_PASSWORD
  }
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    })

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err)
      this.mqttClient.end()
    })

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`)
    })

    // mqtt subscriptions
    this.mqttClient.subscribe("Teste2", { qos: 0, rh: true, rap: true })
    this.mqttClient.subscribe("Teste", { qos: 0 })

    // When a message arrives, console.log it
    this.mqttClient.on("message", function (topic, message) {
      console.log(
        `Mensagem do onMessage pelo tópico ${topic}: ${message.toString()}`
      )
      if (topic == "Teste") {
        console.log("entrou no Teste")
        //this.emit("Trigger", message.toString())
      }
    })

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`)
    })
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish("Teste2", message)
  }
}

module.exports = MqttHandler
