const Task = require('../models/Task')

class TasksServices {
  async getAll({ limit = '15', offset = '0', query = {} } = {}) {
    const newQuery = { state: true, ...query }
    const tasks = await Task.find(newQuery)
      .limit(Number(limit))
      .skip(Number(offset))
    const total = await Task.countDocuments(newQuery)
    return { tasks, total }
  }

  async get({ id } = {}) {
    const task = await Task.findById(id).populate('user')
    return task
  }

  async create({ task }) {
    const newTask = new Task(task)

    return await newTask.save()
  }

  async update({ task, id }) {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true })

    return updatedTask
  }

  async delete({ id }) {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    )

    return updatedTask
  }
}

module.exports = TasksServices
