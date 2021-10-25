const express = require('express')
const passport = require('passport')
const { emailValidation } = require('../middlewares/dbValidations')
const validationHandler = require('../middlewares/validationHandler')
const AuthServices = require('../services/auth')
const { registerSchema, loginSchema } = require('../utils/schemas/AuthSchema')

require('../utils/strategies/jwt')

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
  router.post(
    '/sign-in',
    validationHandler(loginSchema),
    async (req, res, next) => {
      const { email, password } = req.body

      const { err, token, user } = await authServices.login({ email, password })

      if (err) {
        return next(err)
      }

      res.json({
        message: 'Sign in successfull',
        data: {
          user,
          token
        }
      })
    }
  )

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
