const localRepository = require("../repository/localRepository")
const { sequelize } = require("../config/conexao.db")
const { Op } = require("sequelize")
const db = require("../model")

exports.criar = async (body, fnCallback) => {
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

exports.listar = async (fnCallback) => {
  const lista = await db.Local.findAll()

  fnCallback(null, {
    status: 200,
    resultSet: lista,
  })
}
