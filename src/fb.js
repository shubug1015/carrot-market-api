// @ts-check
/* eslint-disable */

const { default: fetch } = require('node-fetch')
const { v4: uuidv4} = require('uuid')
const { getAccessTokenForUserId } = require('./auth')
const { getUsersCollection } = require('./mongodb')

/** @type {string} */
const FB_APP_ID = process.env.FB_APP_ID
/** @type {string} */
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

async function createUserWithFacebookIdAndGetId(facebookId) {
  const users = await getUsersCollection()
  const userId = uuidv4()
  users.insertOne({
    id: userId,
    facebookId: facebookId,
  })
  return userId
}

/**
 * @param {string} accessToken
 * @returns {Promise<string>}
 */
async function getFacebookIdFromAccessToken(accessToken) {
  // implement the function using Facebook API
  // https://developers.facebook.com/docs/facebook-login/access-tokens/#generating-an-app-access-token
  // https://developers.facebook.com/docs/graph-api/reference/v10.0/debug_token

  const appAccessTokenReq = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_CLIENT_SECRET}&grant_type=client_credentials`
  )
  const appAccessToken = (await appAccessTokenReq.json()).access_token

  console.log(appAccessToken)

  const debugReq = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`
  )
  const debugResult = await debugReq.json() // facebook피셜 token parsing결과

  if(debugResult.data.app_id!=FB_APP_ID) {
    throw new Error("Not a valid token.")
  }

  console.log(debugResult)

  return debugResult.data.user_id
}

async function getUserIdWithFacebookId(facebookId) {
  const users = await getUsersCollection()
  const user = users.findOne({ // findOne 작동 안 함
    facebookId,
  })

  if(user) {
    return user.id
  }
  return undefined
}

/**
 * facebook 토큰을 검증하고 해당 검증결과로부터 우리 서비스의 유저를 만들거나
 * 혹은 이미 있는 유저를 가져와서 그 유저의 액세스 토큰을 돌려줌.
 * @param {string} token
 */
async function getUserAccessTokenForFacebookAccessToken(token) {
  const facebookId = await getFacebookIdFromAccessToken(token)

  // 1. 데이터베이스에 해당 facebook id 유저가 있는 경우
  const existingUserId = await getUserIdWithFacebookId(facebookId)

  if(existingUserId) {
    getAccessTokenForUserId(existingUserId)
  }
  // 2. 데이터베이스에 해당 facebook id 유저가 없는 경우
  const userId = createUserWithFacebookIdAndGetId(facebookId)
  return getAccessTokenForUserId(userId)
}

module.exports = {
  FB_APP_ID,
  FB_CLIENT_SECRET,
  getFacebookIdFromAccessToken,
  getUserIdWithFacebookId,
  getUserAccessTokenForFacebookAccessToken,
}
