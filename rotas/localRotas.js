const express = require("express")
const rotas = express.Router()

const localController = require("../controller/localController.js")

rotas.post("/", localController.criar)
rotas.get("/", localController.listar)

module.exports = rotas
