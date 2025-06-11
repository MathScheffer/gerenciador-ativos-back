const express = require("express")
const rotas = express.Router()

const localizacoesController = require("../controller/localizacoesController.js")

rotas.post("/", localizacoesController.criar)
rotas.get("/listar", localizacoesController.listar)
//rotas.get("/", armazenamentoController.listar)

module.exports = rotas
