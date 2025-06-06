/* const mqtt = require("mqtt")
import { IMqttClient } from "ngx-mqtt"
require("dotenv").config()

class MqttHandler {
  host?: string = process.env.BROKER
  username?: string = process.env.BROKER_USER
  password?: string = process.env.BROKER_PASSWORD
  mqttClient?: IMqttClient
  constructor() {
    //super()
    //this.host = process.env.BROKER
    //this.username = process.env.BROKER_USER // mqtt credentials if these are needed to connect
    //this.password = process.env.BROKER_PASSWORD
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
    this.mqttClient.subscribe("localizacoes/persistir", { qos: 2 })
    this.mqttClient.subscribe("localizacoes/persistida", { qos: 2 })

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
 */