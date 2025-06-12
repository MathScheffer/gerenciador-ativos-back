const ativoRepository = require("../repository/ativoRepository")
const db = require("../model")
// MUITO IMPORTANTE: Este módulo DEVE EXPORTAR UMA FUNÇÃO.
// Essa função recebe a instância do 'mqttHandler' como argumento.
module.exports = (mqttHandler) => {
  // <-- Certifique-se de que seu arquivo local comece assim!
  return {
    // Retorna um objeto contendo todos os métodos do serviço.
    // Método para criar um novo ativo
    criar: async (body, fnCallback) => {
      if (!body.nome || !body.tag_ativo) {
        fnCallback({
          status: 403,
          message: "Precisa enviar o nome e a tag_ativo!",
        })
        return
      }
      try {
        ativoRepository.inserir(body.nome, body.tag_ativo, (err, ativo) => {
          if (err) {
            fnCallback(
              {
                status: 500,
                message: "Houve um erro ao cadastrar ativo.",
                error: err,
              },
              null
            )
          } else {
            fnCallback(null, { status: 201, message: ativo })
          }
          return
        })
      } catch (error) {
        fnCallback({
          status: 500,
          message: "Houve um erro ao cadastrar ativo.",
          erro: error,
        })
      }
    },

    // Método para listar todos os ativos
    listar: async (fnCallback) => {
      try {
        const lista = await db.Ativo.findAll()
        fnCallback(null, {
          status: 200,
          message: "Registros encontrados!",
          resultSet: lista,
        })
      } catch (err) {
        fnCallback({
          status: 500,
          message: "Houve um erro ao listar!",
          erro: err,
        })
      }
    },

    // Método para atualizar um ativo existente
    atualizar: async (body, id, fnCallback) => {
      if (!id) {
        fnCallback({
          status: 400,
          message: "Necessário informar o id!",
          erro: "Necessário informar o id do elemento para atualizar.",
        })
        return
      }
      if (!body.tag_ativo && !body.nome) {
        fnCallback({
          status: 400,
          message:
            "Necessário enviar o nome ou o tag_ativo para ser atualizado!",
        })
        return
      }
      try {
        const updatedRow = await db.Ativo.update(body, { where: { id: id } })
        if (!updatedRow[0]) {
          fnCallback(null, {
            status: 200,
            message: `Ativo ${id} não encontrado!`,
          })
          return
        }

        try {
          // AQUI! 'mqttHandler' está disponível e pode ser usado para enviar a mensagem.
          await mqttHandler.sendMessage(
            "localizacoes/persistida",
            JSON.stringify({
              message: "Dados do ativo alterados!",
              ativoId: id,
              dataHora: new Date().toISOString(),
            })
          )
          console.log(
            `\n\nPOSTOU NO TÓPICO MQTT APÓS ATUALIZAÇÃO DO ATIVO ${id}!\n\n`
          )
        } catch (err) {
          console.error("Erro ao enviar mensagem MQTT de atualização:", err)
        }

        fnCallback(null, {
          status: 200,
          message: "Ativo atualizado!",
          resultSet: updatedRow,
        })
      } catch (err) {
        fnCallback({
          status: 500,
          message: "Houve um erro ao atualizar ativo!",
          erro: err,
        })
      }
    },

    // Método para deletar um ativo
    deletar: async (id, fnCallback) => {
      if (!id) {
        fnCallback({
          status: 400,
          message: "Necessário passar o id!",
          erro: "Não é possível apagar um item sem o ID.",
        })
        return
      }
      try {
        const deletedRow = await db.Ativo.destroy({ where: { id: id } })
        if (!deletedRow) {
          fnCallback(null, {
            status: 200,
            message: `Ativo de ${id} não encontrado para deleção.`,
          })
          return
        }
        fnCallback(null, {
          status: 200,
          message: "Ativo deletado!",
          resultSet: deletedRow,
        })
      } catch (err) {
        fnCallback(
          {
            status: 500,
            message: "Houve um erro ao deletar ativo!",
            erro: err,
          },
          null
        )
      }
    },
  }
}
