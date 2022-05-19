// @ts-ignore
/* eslint-disable */

const express = require('express')
const { FB_APP_ID } = require('../fb')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    userId: req.userId,
    APP_CONFIG_JSON: JSON.stringify({
      FB_APP_ID,
    }).replace(/"/g, '\\"'),
  })
})

router.get('/logout', (req, res) => {
  // TODO: implement
})

module.exports = router
