const Joi = require('joi')
const mongoIdSchema = require('./mongoIdSchema')

const nameSchema = Joi.string().min(5).max(80)
const isCompletedSchema = Joi.boolean()
const stateSchema = Joi.boolean()

const createTaskSchema = Joi.object({
  name: nameSchema.required(),
  isCompleted: isCompletedSchema,
  state: stateSchema.default(true)
})

const updateTaskSchema = Joi.object({
  name: nameSchema,
  isCompleted: isCompletedSchema,
  user: mongoIdSchema,
  state: stateSchema
})

module.exports = {
  createTaskSchema,
  updateTaskSchema
}
