const localRepository = require("../repository/localRepository")
const { sequelize } = require("../config/conexao.db")
const { Op } = require("sequelize")
const Usuario = require("../model/usuario")

class UsuarioService {
    login = async (body, fnCallback) => {
        try{
            if(!body.nome || !body.password){
                fnCallback({
                    status: 403,
                    mensagem: "Necessario informar nome e password!"
                }, null)
                return
            }

            const usuario = await Usuario.findOne({where: {'nome': body.nome, 'password': body.password}})
            console.log(usuario)
            fnCallback(null, {
                status: 200,
                resultSet: usuario
            })
        }catch(err) {
            fnCallback({
                status: 500,
                mensagem: 'Houve um erro ao fazer login.',
                erro: err
            }, null)
        }
    }
}

module.exports = UsuarioService