const { Sequelize, DataTypes, Model } = require("sequelize")

const config = require("../config/conexao.db")
const Ativo = require("./ativo")
const Local = require("./local")
const sequelize = config.sequelize

class Localizacao extends Model {}

Localizacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_ativo: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Ativo,
        key: "tag_ativo",
      },
    },
    tag_local: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Local,
        key: "tag_local",
      },
    },
    data_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_saida: {
      type: DataTypes.DATE,
      allowNull: true,
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
