const express = require('express')
const passport = require('passport')
const { emailValidation } = require('../middlewares/dbValidations')
const validationHandler = require('../middlewares/validationHandler')
const AuthServices = require('../services/auth')
const createToken = require('../utils/createToken')
const { registerSchema } = require('../utils/schemas/AuthSchema')

require('../utils/strategies/jwt')
require('../utils/strategies/basic')

function authApi(app) {
  const router = express.Router()
  const authServices = new AuthServices()

  app.use('/api/auth', router)

  router.post(
    '/sign-up',
    validationHandler(registerSchema),
    emailValidation,
    async (req, res) => {
      const user = req.body

      const { user: userCreated, token } = await authServices.createUser({
        user
      })

      res.status(201).json({
        message: 'Sign up successfull',
        data: { user: userCreated, token }
      })
    }
  )

  router.get('/sign-in', function (req, res, next) {
    passport.authenticate('basic', function (err, user) {
      if (err || !user) {
        return next(err)
      }
      req.login(user, { session: false }, function (err) {
        if (err) {
          return next(err)
        }
        const token = createToken(user)
        res.json({
          message: 'hola mundo',
          data: { user, token }
        })
      })
    })(req, res, next)
  })
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'User listed',
        data: {
          user: req.user
        }
      })
    }
  )
}

module.exports = authApi
