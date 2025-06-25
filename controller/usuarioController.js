const UsuarioService = require("../service/usuarioService.js")

class UsuarioController {
    constructor(){
        this.service = new UsuarioService()
    }

    login = async(req, res) => {
        this.service.login(req.body, (err, usuario) => {
            if(err) {
                res.status(err.status).json(err)
            }else{
                res.status(usuario.status).json(usuario.resultSet)
            }
        })
    }
}

module.exports = UsuarioController