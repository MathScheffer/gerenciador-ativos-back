const express = require("express")

const LocalController = require("../controller/localController.js")

class LocalRotas{
    constructor(mqttClient) {
        this.controller = new LocalController(mqttClient)
        this.rotas = express.Router()
        this.rotas.post("/", this.controller.criar)
        this.rotas.get("/", this.controller.listar)
        this.rotas.get("/:id", this.controller.localPorId)
        this.rotas.put("/:id", this.controller.editar)
        this.rotas.delete("/:id", this.controller.deletar)
    }

}


module.exports = LocalRotas
