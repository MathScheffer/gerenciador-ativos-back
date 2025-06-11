const { Sequelize, DataTypes, Model } = require("sequelize")

const config = require("../config/conexao.db")
const sequelize = config.sequelize

class Local extends Model {
  static associate(models) {
    // Um Local pode ter muitas Localizacoes
    Local.hasMany(models.Localizacao, {
      foreignKey: "tag_local", // Coluna na tabela Localizacao que referencia este Local
      sourceKey: "tag_local", // Coluna em Local que é referenciada
    })
  }
}

Local.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_local: {
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
    modelName: "Local",
    tableName: "locais",
    timestamps: false,
  }
)

module.exports = Local
