//index.js
///const app = require("./app.old")
const app = require("./app")
const appWs = require("./app-ws")

app.listen(process.env.PORT || 8080, () => {
  console.log(`App Express is running!`)
})

//appWs(server)
