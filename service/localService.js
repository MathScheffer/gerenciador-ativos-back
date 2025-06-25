const localRepository = require("../repository/localRepository")
const { sequelize } = require("../config/conexao.db")
const { Op } = require("sequelize")
const db = require("../model")

class LocalService {
  constructor(mqttClient){
    this.mqttClient = mqttClient
  }

  criar = async (body, fnCallback) => {
    if (!body.nome || !body.tag_local) {
      fnCallback({
        status: 403,
        message: "Precisa enviar o nome e a tag_local!",
      })

      return
    }
    try {
      localRepository.inserir(body.nome, body.tag_local, (err, local) => {
        if (err) {
          fnCallback(
            {
              status: 500,
              message: "Houve um erro ao cadastrar local.",
              error: err,
            },
            null
          )
        } else {
          fnCallback(null, {
            status: 201,
            message: local,
          })
        }
        return
      })
    } catch (error) {
      fnCallback({
        status: 500,
        message: "Houve um erro ao cadastrar local.",
        erro: error,
      })
    }
  }

  listar = async (fnCallback) => {
    const lista = await db.Local.findAll()

    fnCallback(null, {
      status: 200,
      resultSet: lista,
    })
  }

  localPorId = async (id, fnCallback) => {
    try{
      const local = await db.Local.findOne({where: {'id': id}})

      fnCallback(null,{
        status: 200,
        resultSet: local ? local : {}
      })

    }catch(err) {
      fnCallback({
        status: 500,
        mensagem: `Houve um erro ao buscar local por id: ${err}`
      }, null)
    }
  }

  deletar = async (id, fnCallback) => {
    try{
      const local = await db.Local.destroy({where: {'id': id}})
      console.log(local)
      fnCallback(null,{
        status: 200,
        mensagem: `Local ${id} deletado com sucesso!`
      })

    }catch(err){
      fnCallback({
        status: 500,
        message: "Houve um erro ao deletar local.",
        erro: err,
      })
    }
  }

  editar = async (body, id, fnCallback) => {
    console.log(body)
      if (!id) {
        fnCallback({
          status: 400,
          message: "Necessário informar o id!",
          erro: "Necessário informar o id do elemento para atualizar.",
        })
        return
      }
      if (!body.tag_local && !body.nome) {
        fnCallback({
          status: 400,
          message:
            "Necessário enviar o nome ou o tag_local para ser atualizado!",
        })
        return
      }
      try {
        const updatedRow = await db.Local.update(body, { where: { id: id } })
        if (!updatedRow[0]) {
          fnCallback(null, {
            status: 200,
            message: `Local ${id} não encontrado!`,
          })
          return
        }

        try {
          // AQUI! 'mqttHandler' está disponível e pode ser usado para enviar a mensagem.
          await this.mqttClient.sendMessage(
            "localizacoes/persistida",
            JSON.stringify({
              message: "Dados do local alterados!",
              localId: id,
              dataHora: new Date().toISOString(),
            })
          )
          console.log(
            `\n\nPOSTOU NO TÓPICO MQTT APÓS ATUALIZAÇÃO DO LOCAL ${id}!\n\n`
          )
        } catch (err) {
          console.error("Erro ao enviar mensagem MQTT de atualização:", err)
          fnCallback({
            status: 500,
            message: `Erro ao enviar mensagem MQTT de atualização: ${err}`,
            erro: err,
          })
        }

        fnCallback(null, {
          status: 200,
          message: `Local atualizado ${id}!`
        })
      } catch (err) {
        fnCallback({
          status: 500,
          message: `Houve um erro ao atualizar Local ${id}!`,
          erro: err,
        })
      }
    }
}

module.exports = LocalService
