//app.js
const express = require("express")

const cors = require("cors")

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))

app.use(express.json())

app.post("/login", (req, res, next) => {
  res.json({ token: "123456" })
})

module.exports = app
