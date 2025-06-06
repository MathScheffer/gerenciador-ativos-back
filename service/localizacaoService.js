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
    localizacaoRepository.listarPorNomeETag(
      body.tag_ativo,
      body.tag_local,
      (err, localizacoes) => {
        if (err) {
          fnCallback({
            status: 500,
            message: "Houve um erro ao procurar localizacao.",
            erro: err,
          })
        } else {
          if (localizacoes.lenght > 0) {
            fnCallback(null, localizacoes)
            /*             localizacoes.forEach((localizacao) => {
              localizacaoRepository.cadastrarSaida(
                localizacao.id,
                localizacao.data_entrada
              )
            }) */
          } else {
            localizacaoRepository.cadastrar(
              ativo,
              tag_ativo,
              local,
              tag_local,
              data_entrada,
              (err, localizacao) => {
                if (err) {
                  fnCallback(
                    {
                      status: 500,
                      message: "Houve um erro ao procurar localizacao.",
                      error: err,
                    },
                    null
                  )
                  throw error("erro")
                } else {
                  fnCallback(null, {
                    status: 201,
                    message: JSON.stringify(localizacao),
                  })
                }
                return
              }
            )
          }
        }
      }
    )
  } catch (err) {
    fnCallback({
      status: 500,
      message: "Houve um erro ao procurar localizacao.",
      erro: "erro no catch",
    })
    return
  }
}
