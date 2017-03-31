const { send, json } = require('micro')
const HttpHash = require('http-hash')
const Db = require('../wall-db')
const DbStub = require('./test/stub/db')
const utils = require('./lib/utils')
const config = require('./config')

const hash = HttpHash()
let db = new Db()

if (process.env.NODE_ENV === 'test') {
  db = new DbStub()
}

hash.set('POST /', async function savePost (req, res) {
  const post = await json(req)

  try {
    const token = await utils.extractToken(req)
    const encoded = await utils.verifyToken(token, config.secret, {})
    if (encoded && encoded.userId !== post.userId) {
      return send(res, 401, { error: 'invalid token' })
    }
  } catch (e) {
    return send(res, 401, { error: e.message })
  }

  const created = await db.savePost(post)
  send(res, 201, created)
})

hash.set('GET /list', async function listPosts (req, res) {
  const posts = await db.listPosts()
  send(res, 200, posts)
})

async function main (req, res) {
  const { method, url } = req
  const match = hash.get(`${method.toUpperCase()} ${url}`)

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, { error: 'route not found' })
  }
}

module.exports = main
