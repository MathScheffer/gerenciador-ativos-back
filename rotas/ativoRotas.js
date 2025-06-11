const express = require("express")
const rotas = express.Router()

const ativoController = require("../controller/ativoController.js")

rotas.post("/", ativoController.criar)
rotas.get("/", ativoController.listar)

module.exports = rotas
