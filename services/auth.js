const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const boom = require('@hapi/boom')

const User = require('../models/User')

class AuthServices {
  async createUser({ user }) {
    const { password, ...restUser } = user
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ password: hashedPassword, ...restUser })

    return newUser.save()
  }

  async login({ email, password }) {
    const user = await User.findOne({ email })
    if (!user) {
      return { err: boom.unauthorized('Email or password incorrect') }
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
      return { err: boom.unauthorized('Email or password incorrect') }
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name
    }
    const token = jwt.sign(payload, secret)
    return { token, user }
  }
}

module.exports = AuthServices
