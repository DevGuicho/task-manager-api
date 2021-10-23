const boom = require('@hapi/boom')

function validate(schema, data) {
  const { error } = schema.validate(data)
  return error
}

function validationHandler(schema, check = 'body', param) {
  return (req, res, next) => {
    const data = check === 'body' ? req[check] : req[check][param]

    const error = validate(schema, data)

    if (error) {
      next(boom.badRequest(error))
    } else {
      next()
    }
  }
}

module.exports = validationHandler
