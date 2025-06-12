const { Ativo } = require("../model")
exports.inserir = async (nome, tag_ativo, fnCallback) => {
  try {
    const ativo = await Ativo.create({
      nome,
      tag_ativo,
    })
    fnCallback(null, ativo)
  } catch (err) {
    console.log(err)
    fnCallback(err, null)
  }
}
