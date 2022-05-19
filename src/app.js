// @ts-ignore
/* eslint-disable */

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

const userRouter = require('./routers/user')
const mainRouter = require('./routers/main')
const setupPassportFBAuth = require('./passport-auth-fb')

app.use(cookieParser())
app.use(async (req, res, next) => {
  const { access_token } = req.cookies
  if (access_token) {
    // implement
  }
  next()
})

setupPassportFBAuth(app)
app.use('/users', userRouter)
app.use('/public', express.static('src/public'))
app.use('/', mainRouter)

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

module.exports = app