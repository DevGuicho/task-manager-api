const boom = require('@hapi/boom')
const User = require('../models/User')

async function emailValidation(req, res, next) {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (user) {
    next(boom.badRequest('Email already registered'))
  } else {
    next()
  }
}

module.exports = {
  emailValidation
}
