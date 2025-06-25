const { Model, DataTypes } = require("sequelize");

const config = require("../config/conexao.db")
const sequelize = config.sequelize

class Usuario extends Model {}

Usuario.init(
     {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
       },
       nome: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
       },
       password: {
         type: DataTypes.STRING,
         allowNull: false,
       }
     },
     {
       sequelize,
       modelName: "Usuario",
       tableName: "usuario",
       timestamps: false,
     }
)

module.exports = Usuario