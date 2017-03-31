const Promise = require('bluebird')
const sequelize = require('./sequelize')
const models = require('../models')
const utils = require('./utils')

class Db {
  async saveUser (user, callback) {
    try {
      if (!user) throw new Error('no data')

      const newUser = Object.assign({}, user)
      newUser.password = utils.encrypt(user.password)

      const created = await models.User.create(newUser)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      const result = await models.User.findOne({
        where: { username }
      })

      if (!result) throw new Error('not found')

      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async savePost (post, callback) {
    try {
      if (!post) throw new Error('no data')
      const created = await models.Post.create(post)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async listPosts (callback) {
    try {
      const result = await models.Post.findAll({
        include: [
          { model: models.User }
        ]
      })
      return Promise.resolve(result).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async authenticate (username, password, callback) {
    try {
      const user = await this.getUser(username)
      if (user.password === utils.encrypt(password)) {
        return Promise.resolve(true).asCallback(callback)
      }
      return Promise.resolve(false).asCallback(callback)
    } catch (e) {
      return Promise.resolve(false).asCallback(callback)
    }
  }

  async setup (callback) {
    try {
      await sequelize.sync()
      return Promise.resolve('Setup completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async dropTables (callback) {
    try {
      await sequelize.drop()
      return Promise.resolve('Drop completed').asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }
}

module.exports = Db
