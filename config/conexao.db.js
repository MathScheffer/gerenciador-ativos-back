const { Sequelize } = require("sequelize")

exports.sequelize = new Sequelize(
  "postgresql://postgres:P4ssw0rdP0STGR3SS@db.ogrfmpvyjnybliwzlqsl.supabase.co:5432/postgres",
  {
    dialect: "postgres",
  }
)

//module.exports = conexao;
