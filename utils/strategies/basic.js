const passport = require('passport')
const boom = require('@hapi/boom')
const { BasicStrategy } = require('passport-http')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

passport.use(
  new BasicStrategy(async function (email, password, done) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(boom.unauthorized('User or password incorrect'), false)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return done(boom.unauthorized('User or password incorrect'), false)
      }

      return done(null, user)
    } catch (error) {
      done(boom.badRequest())
    }
  })
)
