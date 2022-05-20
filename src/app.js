// @ts-check
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
const { verifyJWT } = require('./jwt')
const { getUsersCollection } = require('./mongodb')

app.use(cookieParser())
app.use(async (req, res, next) => {
  const { access_token } = req.cookies
  if(access_token) {
    try {
      const userId = await verifyJWT(access_token)
      if(userId) {
        const users = await getUsersCollection()
        const user = await users.findOne({ // findOne이 안 먹는 이유는?
          id: userId,
        })
        if(user) {
          req.userId = user.id
        }
      }
    }
    catch(e) {
      console.log('error', e)
    }
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