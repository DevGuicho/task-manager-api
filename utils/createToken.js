const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const createToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name
  }
  const token = jwt.sign(payload, secret)

  return token
}

module.exports = createToken
