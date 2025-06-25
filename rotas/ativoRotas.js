const express = require("express")

module.exports = (mqttClient) => {
  // <-- mqttClient é recebido aqui
  const rotas = express.Router() // <-- O roteador é criado DENTRO do escopo da função

  // O controlador é inicializado AQUI, DENTRO do escopo onde 'mqttClient' é acessível.
  // Passamos 'mqttClient' para o controller.
  const ativoController = require("../controller/ativoController.js")(
    mqttClient
  )

  // Define as rotas HTTP e associa-as aos métodos do controlador
  rotas.post("/", ativoController.criar)
  rotas.get("/", ativoController.listar)
  rotas.get("/:id", ativoController.ativoPorId)
  rotas.delete("/:id", ativoController.deletar) // <-- Mudei de 'delete' para 'deletar' para consistência
  rotas.put("/:id", ativoController.atualizar)

  return rotas // Retorna o roteador configurado
}
