const debug = require('debug')('app:server')
const { connect } = require('mongoose')
const { dbUser, dbPassword, dbHost, dbName } = require('../config')

const URI = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

connect(URI)
  .then(() => debug('Database is connected'))
  .catch((err) => debug(err))
