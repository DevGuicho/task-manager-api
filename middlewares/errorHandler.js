const boom = require('@hapi/boom')
const debug = require('debug')('app:error')
const { isDev } = require('../config')

function withErrorStack(error, stack) {
  if (isDev) {
    return { ...error, stack }
  }
  return error
}

function logError(err, req, res, next) {
  debug(err)
  next(err)
}

function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation())
  }
  next(err)
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode).json(withErrorStack(payload, err.stack))
}

module.exports = {
  wrapError,
  logError,
  errorHandler
}
