const uuid = require('uuid/v4')

function getUser () {
  const id = uuid()
  return {
    id,
    username: id,
    password: id,
    email: `${id}@gmail.com`
  }
}

function getPost () {
  const id = uuid()
  return {
    id,
    content: `${id}`,
    userId: id
  }
}

function getPosts () {
  return [
    getPost(),
    getPost(),
    getPost()
  ]
}

module.exports = {
  getUser,
  getPost,
  getPosts
}
