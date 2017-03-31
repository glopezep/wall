const request = require('request-promise-native')
const Promise = require('bluebird')

class Client {
  constructor (options) {
    this.options = options || {
      endpoints: {
        posts: 'http://api.wall.com/post',
        users: 'http://api.wall.com/user',
        auth: 'http://api.wall.com/auth'
      }
    }
  }

  savePost (post, token, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.posts}/`,
      body: post,
      json: true,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  listPosts (callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.posts}/list`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  saveUser (user, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/`,
      body: user,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  getUser (username, callback) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  authenticate (username, password, callback) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      body: {
        username,
        password
      },
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }
}

module.exports = Client
