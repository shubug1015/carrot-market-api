// @ts-check
/* eslint-disable */

const { signJWT } = require('./jwt')

async function getAccessTokenForUserId(userId) {
    return signJWT(userId)
}

module.exports = {
    getAccessTokenForUserId
}