const express = require('express')
const { emailValidation } = require('../middlewares/dbValidations')
const validationHandler = require('../middlewares/validationHandler')
const AuthServices = require('../services/auth')
const { registerSchema, loginSchema } = require('../utils/schemas/AuthSchema')

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

      const userCreated = await authServices.createUser({ user })

      res.status(201).json({
        message: 'Sign up successfull',
        data: userCreated
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
}

module.exports = authApi
