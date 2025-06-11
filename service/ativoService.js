const ativoRepository = require("../repository/ativoRepository")
const db = require("../model")

exports.criar = async (body, fnCallback) => {
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
        fnCallback(null, {
          status: 201,
          message: ativo,
        })
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
}

exports.listar = async (fnCallback) => {
  const lista = await db.Ativo.findAll()

  fnCallback(null, {
    status: 200,
    resultSet: lista,
  })
}
