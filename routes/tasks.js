const express = require('express')
const passport = require('passport')
const validationHandler = require('../middlewares/validationHandler')

const TasksServices = require('../services/tasks')
const mongoIdSchema = require('../utils/schemas/mongoIdSchema')
const {
  createTaskSchema,
  updateTaskSchema
} = require('../utils/schemas/TaskSchema')

require('../utils/strategies/jwt')

function taskApi(app) {
  const router = express.Router()
  const tasksServices = new TasksServices()

  app.use('/api/tasks', router)

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { limit, offset } = req.query
      const { tasks, total } = await tasksServices.getAll({
        limit,
        offset,
        query: { user: req.user._id }
      })
      res.json({
        message: 'Tasks listed',
        data: { tasks, total }
      })
    }
  )

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(mongoIdSchema, 'params', 'id'),
    async (req, res) => {
      const { id } = req.params

      const task = await tasksServices.get({ id })

      res.json({
        message: 'Task retrieved',
        data: task
      })
    }
  )

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createTaskSchema),
    async (req, res) => {
      const { name, isCompleted } = req.body
      const task = { name, isCompleted, user: req.user._id }

      const taskCreated = await tasksServices.create({ task })
      res.json({
        message: 'Task created',
        data: taskCreated
      })
    }
  )

  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(mongoIdSchema, 'params', 'id'),
    validationHandler(updateTaskSchema),
    async (req, res) => {
      const { id } = req.params
      const task = req.body

      const updatedTask = await tasksServices.update({ id, task })

      res.json({
        message: 'Task updated',
        data: updatedTask
      })
    }
  )

  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(mongoIdSchema, 'params', 'id'),
    async (req, res) => {
      const { id } = req.params

      const taskDeleted = await tasksServices.delete({ id })

      res.json({
        message: 'Task deleted',
        data: taskDeleted
      })
    }
  )
}

module.exports = taskApi
