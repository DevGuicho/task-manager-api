const Joi = require('joi')

const emailSchema = Joi.string().email()
const passwordSchema = Joi.string().min(8)

const nameSchema = Joi.string().min(2).max(30)
const avatarSchema = Joi.string().uri()
const stateSchema = Joi.boolean()

const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required()
})

const registerSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  avatar: avatarSchema,
  state: stateSchema.default(true)
})

module.exports = {
  loginSchema,
  registerSchema
}
