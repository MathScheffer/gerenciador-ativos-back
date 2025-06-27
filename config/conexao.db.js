const { Sequelize } = require("sequelize")

exports.sequelize = new Sequelize(
  //"postgresql://postgres:P4ssw0rdP0STGR3SS@db.ogrfmpvyjnybliwzlqsl.supabase.co:5432/postgres",
  "postgresql://postgres.ogrfmpvyjnybliwzlqsl:P4ssw0rdP0STGR3SS@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  {
    dialect: "postgres",    
    dialectOptions: {
      ssl: {
        require: true, // Força o uso de SSL
        rejectUnauthorized: false // Ignora a verificação do certificado. Útil em ambientes como Render/Supabase.
      }
    },
  }
)

//module.exports = conexao;
