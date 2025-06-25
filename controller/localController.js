const LocalService = require("../service/localService")

class LocalController {
  constructor(mqttClient){
    this.localService = new LocalService(mqttClient)
  }

  criar = async (req, res) => {
    this.localService.criar(req.body, (err, local) => {
      if (err) {
        res.status(err.status).json(err)
      } else {
        res.status(local.status).json(local)
      }
    })
  }

  listar = async (req, res) => {
    this.localService.listar((err, local) => {
      if (err) {
        res.status(err.status).json(err)
      } else {
        res.status(local.status).json(local.resultSet)
      }
    })
  }

  localPorId = async (req, res) => {
    const id = req.params.id

    this.localService.localPorId(parseInt(id),(err, local) => {
      if (err) {
        res.status(err.status).json(err)
      } else {
        res.status(local.status).json(local.resultSet)
      }
    })
  }
  deletar = async (req,res) => {
    const id = req.params.id

    this.localService.deletar(id,(err, local) => {
      if (err) {
        res.status(err.status).json(err)
      } else {
        res.status(local.status).json(local.resultSet)
      }
    })
  }

  editar = async (req,res) => {
    const id = req.params.id

    this.localService.editar(req.body, id,(err, local) => {
      if (err) {
        res.status(err.status).json(err)
      } else {
        res.status(local.status).json(local)
      }
    })
  }
}



module.exports = LocalController