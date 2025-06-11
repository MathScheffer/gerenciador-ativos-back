// models/index.js (or similar)
const Sequelize = require("sequelize")
const config = require("../config/conexao.db")

const sequelize = config.sequelize
const db = {}

// Import all your models
db.Ativo = require("./ativo") // Make sure Ativo is imported first if Localizacao references it directly in init
db.Local = require("./local") // Assuming you have a Local model file
db.Localizacao = require("./localizacao")

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db) // Pass the entire 'db' object as 'models'
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
