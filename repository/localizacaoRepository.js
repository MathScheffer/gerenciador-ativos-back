const { where } = require("sequelize")
const conexao = require("../config/conexao.db")
const sequelize = conexao.sequelize
const Localizacao = require("../model/localizacao")

exports.cadastrarEntrada = async (
  ativo,
  tag_ativo,
  local,
  tag_local,
  data_entrada,
  fnCallback
) => {
  await sequelize.sync({ alter: true })

  try {
    const localizacao = await Localizacao.create(
      ativo,
      tag_ativo,
      local,
      tag_local,
      data_entrada
    )
    fnCallback(null, localizacao)
  } catch (err) {
    fnCallback(err, null)
  }
}

exports.cadastrarSaida = async (id, data_saida, fnCallback) => {
  try {
    const localizacao = await Localizacao.findOne({ where: { id: id } })
    console.log(JSON.stringify(localizacao))
    //await localizacao.save({ fields: ["data_saida"] })
    await localizacao.update({ data_saida: data_saida }, { where: { id: id } })

    fnCallback(null, localizacao)
  } catch (err) {
    fnCallback(err, null)
  }
}
exports.listarPorNomeETag = async (tag_ativo, tag_local, fnCallback) => {
  try {
    const localizacoes = await Localizacao.findAll({
      where: {
        tag_ativo: tag_ativo,
        tag_local: tag_local,
      },
    })
    fnCallback(null, localizacoes)
  } catch (err) {
    console.log(err)
    fnCallback(err, null)
  }
}
