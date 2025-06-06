const { Sequelize, DataTypes, Model } = require("sequelize")

const config = require("../config/conexao.db")
const sequelize = config.sequelize

class Localizacao extends Model {
  constructor() {}
}

Localizacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ativo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    local: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag_ativo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag_local: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_entrada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_saida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Localizacao",
    tableName: "localizacoes",
    timestamps: false,
  }
)

module.exports = Localizacao
