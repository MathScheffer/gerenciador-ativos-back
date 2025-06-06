const localizacaoService = require("../service/localizacaoService")

exports.criar = async (req, res) => {
  localizacaoService.criar(req.body, (err, localizacao) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.json(localizacao)
    }
  })
}
