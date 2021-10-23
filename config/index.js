if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

module.exports = {
  port: process.env.PORT || 3001,
  isDev: process.env.NODE_ENV === 'development',
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  secret: process.env.SECRET
}
