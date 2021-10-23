const boom = require('@hapi/boom')

const notFoundHandler = (req, res) => {
  const {
    output: { payload, statusCode }
  } = boom.notFound()
  res.status(statusCode).json(payload)
}

module.exports = notFoundHandler
