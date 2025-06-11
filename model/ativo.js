const { Sequelize, DataTypes, Model } = require("sequelize")

const config = require("../config/conexao.db")
const sequelize = config.sequelize

class Ativo extends Model {}

Ativo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_ativo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ativo",
    tableName: "ativos",
    timestamps: false,
  }
)

module.exports = Ativo
