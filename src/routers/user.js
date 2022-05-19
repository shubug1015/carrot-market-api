// @ts-ignore
/* eslint-disable */

const express = require('express')
const { getUserAccessTokenForFacebookAccessToken } = require('../fb')

const router = express.Router()

router.post('/auth/facebook', async (req, res) => {
  const { access_token: fbUserAccessToken } = req.query

  if (typeof fbUserAccessToken !== 'string') {
    res.sendStatus(400)
    return
  }

  const userAccessToken = await getUserAccessTokenForFacebookAccessToken(
    fbUserAccessToken
  )

  res.cookie('access_token', userAccessToken, {
    httpOnly: true,
    secure: true,
  })
  res.sendStatus(200)
})

module.exports = router
