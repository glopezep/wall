const fixtures = require('../fixtures')

class Db {
  savePost (post) {
    return Promise.resolve(post)
  }

  listPosts () {
    return Promise.resolve(fixtures.getPosts())
  }

  saveUser (user) {
    return Promise.resolve(user)
  }

  getUser (username) {
    const user = fixtures.getUser()
    user.username = username
    return Promise.resolve(user)
  }

  authenticate (username, password) {
    return Promise.resolve(true)
  }
}

module.exports = Db
