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

hash.set('POST /', async function authenticate (req, res) {
  const credentials = await json(req)
  const { username, password } = credentials
  const auth = await db.authenticate(username, password)

  if (!auth) {
    send(res, 401, { error: 'invalid credentials' })
  }

  const user = await db.getUser(username)
  const token = await utils.signToken({ username, userId: user.id }, config.secret)

  send(res, 200, token)
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
