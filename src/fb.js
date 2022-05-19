// @ts-ignore
/* eslint-disable */

const { default: fetch } = require('node-fetch')

/** @type {string} */
const FB_APP_ID = process.env.FB_APP_ID
/** @type {string} */
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

// async function createUserWithFacebookIdAndGetId(facebookId) {
//   
// }

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

  const debugReq = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`
  )
  const debugResult = await debugReq.json()

  return debugResult.data.user_id
}

// async function getUserIdWithFacebookId(facebookId) {
  
// }

/**
 * facebook 토큰을 검증하고 해당 검증결과로부터 우리 서비스의 유저를 만들거나
 * 혹은 이미 있는 유저를 가져와서 그 유저의 액세스 토큰을 돌려줌.
 * @param {string} token
 */
async function getUserAccessTokenForFacebookAccessToken(token) {
  await getFacebookIdFromAccessToken(token)

}

module.exports = {
  FB_APP_ID,
  FB_CLIENT_SECRET,
  getFacebookIdFromAccessToken,
  // getUserIdWithFacebookId,
  getUserAccessTokenForFacebookAccessToken,
}
