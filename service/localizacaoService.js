const localizacaoRepository = require("../repository/localizacaoRepository")
const Localizacao = require("../model/localizacao")
const { sequelize } = require("../config/conexao.db")
const { Op } = require("sequelize")

exports.criar = async (body, fnCallback) => {
  const saidas = []
  console.log(`\n\n AQUI!!!!!!!!${JSON.stringify(body)}`)
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
    /**
     * Se há uma localização e uma tag registrada e eu recebo um registro dele, significa que meu equipamento saiu da sala, logo, preciso setar o data_saida deste registro.
     */
    const localizacoesAtivos = await Localizacao.findAll({
      where: {
        [Op.and]: [
          { tag_ativo: body.tag_ativo },
          { tag_local: body.tag_local },
          { data_saida: null },
        ],
      },
    })

    if (localizacoesAtivos.length > 0) {
      console.log("\n\nACHOU O LOCALIACOES_ ATVOS!!!!!!!!!!!!!!!!!!!!!\n\n")

      for (const loc of localizacoesAtivos) {
        loc.data_saida = Date.now()
        await loc.save()
        saidas.push({
          tag_ativo: loc.tag_ativo,
          tag_local: loc.tag_local,
          data_saida: loc.data_saida,
        })
      }

      fnCallback(null, {
        status: 200,
        message: `Saida do equipamento ${body.tag_ativo} do local ${body.tag_local} registrada!`,
        saidas: saidas,
      })

      return
    }
    console.log(`\n\n PASSOU DO RETURN!!!!!!!!!!!!!!!!!!! \n\n`)
    const registrosAtivos = await Localizacao.findAll({
      where: {
        [Op.and]: [{ tag_ativo: body.tag_ativo }, { data_saida: null }],
      },
    })

    if (registrosAtivos.length > 0) {
      console.log(`\n\n\nEntrou no REGISTROATIVOS\n\n\n`)
      for (const loc of registrosAtivos) {
        loc.data_saida = Date.now()
        await loc.save()
        saidas.push({
          tag_ativo: loc.tag_ativo,
          tag_local: loc.tag_local,
          data_saida: loc.data_saida,
        })
      }
    }
    console.log(`\n\n\nVAI USAR O CADASTRAR ENTRADA\n\n\n`)
    localizacaoRepository.cadastrarEntrada(
      body.tag_ativo,
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
        } else {
          fnCallback(null, {
            status: 201,
            message: localizacao,
            saidas: saidas,
          })
        }
        return
      }
    )
  } catch (error) {
    fnCallback({
      status: 500,
      message: "Houve um erro ao procurar localizacao.",
      erro: error,
    })
  }
}
