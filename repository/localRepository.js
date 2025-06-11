const { where } = require("sequelize")
const conexao = require("../config/conexao.db")
const sequelize = conexao.sequelize
const Local = require("../model/local")

exports.inserir = async (nome, tag_local, fnCallback) => {
  try {
    const local = await Local.create({
      nome,
      tag_local,
    })
    fnCallback(null, local)
  } catch (err) {
    console.log(err)
    fnCallback(err, null)
  }
}
