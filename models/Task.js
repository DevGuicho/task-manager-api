const { model, Schema } = require('mongoose')

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is rquired']
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state: {
    type: Boolean,
    default: true
  }
})

TaskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id

    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Task = model('Task', TaskSchema)

module.exports = Task
