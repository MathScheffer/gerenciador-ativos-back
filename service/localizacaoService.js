const localizacaoRepository = require("../repository/localizacaoRepository")
const Localizacao = require("../model/localizacao")
const { sequelize } = require("../config/conexao.db")

exports.criar = async (body, fnCallback) => {
  if (!body.tag_ativo || !body.tag_local) {
    fnCallback(
      {
        status: 403,
        message: "Necessario informar os parâmetros tag_ativo e tag_local.",
      },
      null
    )
  }
  try {
    const locs = await Localizacao.findAll({
      where: { tag_ativo: body.tag_ativo, tag_local: body.tag_local },
    })
    console.log(locs.length > 0)

    if (locs.length > 0) {
      console.log(locs.length > 0)
      fnCallback(null, "Encontrou itens")
    } else {
      localizacaoRepository.cadastrarEntrada(
        "null",
        body.tag_ativo,
        "null",
        body.tag_local,
        Date.now(),
        (err, localizacao) => {
          if (err) {
            fnCallback(
              {
                status: 500,
                message: "Houve um erro ao cadastrar localização.",
                error: err,
              },
              null
            )
            throw new Error("erro")
          } else {
            fnCallback(null, {
              status: 201,
              message: JSON.stringify(localizacao),
            })
          }
          return
        }
      )
      console.log(locs.length > 0)
      fnCallback(null, "Entrou onde n era")
    }
  } catch (err) {
    fnCallback({
      status: 500,
      message: "Houve um erro ao procurar localizacao.",
      erro: "erro no catch",
    })
    return
  }
}
