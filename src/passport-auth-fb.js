// @ts-check
/* eslint-disable */

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const {
  FB_APP_ID,
  FB_CLIENT_SECRET,
  getUserAccessTokenForFacebookAccessToken,
} = require('../../carrot-market-api/src/fb')

function setupFBAuth(app) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FB_APP_ID,
        clientSecret: FB_CLIENT_SECRET,
        callbackURL: '', // TODO: Use correct callback URL
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, {
          facebook: {
            accessToken,
          },
        })
      }
    )
  )

  app.use(passport.initialize())

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  app.get(
    '/passport/facebook',
    passport.authenticate('facebook', { session: false })
  )

  app.get(
    '/passport/facebook/callback',
    passport.authenticate('facebook', {
      session: false,
    }),
    async (req, res) => {
      const fbAccessToken = req.user.facebook.accessToken
      if (fbAccessToken) {
        const accessToken = await getUserAccessTokenForFacebookAccessToken(
          fbAccessToken
        )
        res.cookie('access_token', accessToken, {
          httpOnly: true,
          secure: true,
        })
        res.redirect('/')
      }
    }
  )
}

module.exports = setupFBAuth
