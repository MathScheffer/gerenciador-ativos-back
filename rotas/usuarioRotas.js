const express = require("express")
const UsuarioController = require("../controller/usuarioController.js")

class UsuarioRotas {
    constructor(){
        this.controller = new UsuarioController()
        this.rotas = express.Router()
        this.rotas.post("/", this.controller.login)
    }
    
}

module.exports = UsuarioRotas