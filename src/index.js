// @ts-check

/* eslint-disable no-console */

const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("Root - GET")
})

app.post("/", (req, res) => {
  res.send("Root - POST")
})

app.listen(5000)
