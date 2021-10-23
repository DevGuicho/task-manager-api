const debug = require('debug')('app:server')
const express = require('express')
const passport = require('passport')

const { port } = require('./config')
const {
  logError,
  wrapError,
  errorHandler
} = require('./middlewares/errorHandler')
const notFoundHandler = require('./middlewares/notFoundHandler')
const authApi = require('./routes/auth')
const taskApi = require('./routes/tasks')
const app = express()

require('./lib/db')

app.use(passport.initialize())
app.use(express.json())

taskApi(app)
authApi(app)

app.use(notFoundHandler)

app.use(wrapError)
app.use(logError)
app.use(errorHandler)

app.listen(port, () => debug(`Server running on port ${port}`))
