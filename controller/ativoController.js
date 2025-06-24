// Este módulo agora EXPORTA UMA FUNÇÃO que recebe 'mqttClient' como argumento.
// Essa função é chamada no 'rotas/ativoRotas.js' e recebe a instância única do MqttHandler.
module.exports = (mqttClient) => {
  // <-- 'mqttClient' é recebido aqui
  // O serviço 'ativoService' é inicializado AQUI, dentro do escopo onde 'mqttClient' é acessível.
  // Passamos 'mqttClient' para o service.
  const ativoService = require("../service/ativoService")(mqttClient)

  return {
    // Retorna um objeto com os métodos do controller
    criar: async (req, res) => {
      ativoService.criar(req.body, (err, local) => {
        if (err) {
          res.status(err.status).json(err)
        } else {
          res.status(local.status).json(local)
        }
      })
    },
    listar: async (req, res) => {
      ativoService.listar((err, ativos) => {
        if (err) {
          res.status(err.status).json(err)
        } else {
          res.status(ativos.status).json(ativos.resultSet)
        }
      })
    },
    atualizar: async (req, res) => {
      const id = req.params.id
      ativoService.atualizar(req.body, id, (err, local) => {
        if (err) {
          res.status(err.status).json(err)
        } else {
          res.status(local.status).json(local)
        }
      })
    },
    deletar: async (req, res) => {
      // <-- Nome do método consistente com 'ativoRotas.js'
      const id = req.params.id
      ativoService.deletar(id, (err, local) => {
        if (err) {
          res.status(err.status).json(err)
        } else {
          res.status(local.status).json(local)
        }
      })
    },
  }
}
