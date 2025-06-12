const ativoService = require("../service/ativoService")

exports.criar = async (req, res) => {
  ativoService.criar(req.body, (err, local) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.status(local.status).json(local)
    }
  })
}
exports.listar = async (req, res) => {
  ativoService.listar((err, local) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.status(local.status).json(local)
    }
  })
}
exports.atualizar = async (req, res) => {
  const id = req.params.id

  ativoService.atualizar(req.body, id, (err, local) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.status(local.status).json(local)
    }
  })
}

exports.delete = async (req, res) => {
  const id = req.params.id
  ativoService.deletar(id, (err, local) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.status(local.status).json(local)
    }
  })
}
