const express = require("express")
const rotas = express.Router()

const localizacoesController = require("../controller/localizacoesController.js")

rotas.post("/post", localizacoesController.criar)

//rotas.get("/", armazenamentoController.listar)

module.exports = rotas
