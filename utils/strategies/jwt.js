const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const boom = require('@hapi/boom')

const User = require('../../models/User')
const { secret } = require('../../config')

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
    },
    async function (payload, done) {
      const user = await User.findById(payload.id)
      if (!user) {
        return done(boom.unauthorized(), false)
      }

      done(null, user)
    }
  )
)
