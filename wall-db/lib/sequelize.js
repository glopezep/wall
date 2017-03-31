const Sequelize = require('sequelize')
const config = require('../config')

let { dbName, dbUser, dbPassword, dbConfig } = config

if (process.env.NODE_ENV === 'test') {
  dbName = 'wall_test'
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, dbConfig)

module.exports = sequelize
