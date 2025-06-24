const localService = require("../service/localService")

exports.criar = async (req, res) => {
  localService.criar(req.body, (err, local) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.status(local.status).json(local)
    }
  })
}
exports.listar = async (req, res) => {
  localService.listar((err, local) => {
    if (err) {
      res.status(err.status).json(err)
    } else {
      res.status(local.status).json(local.resultSet)
    }
  })
}
