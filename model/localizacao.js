const { Sequelize, DataTypes, Model } = require("sequelize")

const config = require("../config/conexao.db")
const Ativo = require("./ativo")
const Local = require("./local")
const sequelize = config.sequelize

class Localizacao extends Model {
  static associate(models) {
    // Uma Localização pertence a um Local
    Localizacao.belongsTo(models.Local, {
      foreignKey: "tag_local",
      targetKey: "tag_local", // Coluna na tabela Local que 'tag_local' referencia
    })

    // Uma Localização pertence a um Ativo
    Localizacao.belongsTo(models.Ativo, {
      foreignKey: "tag_ativo",
      targetKey: "tag_ativo", // Coluna na tabela Ativo que 'tag_ativo' referencia
    })
  }
}

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
