const { send, json } = require('micro')
const HttpHash = require('http-hash')
const Db = require('../wall-db')
const DbStub = require('./test/stub/db')

const hash = HttpHash()
let db = new Db()

if (process.env.NODE_ENV === 'test') {
  db = new DbStub()
}

hash.set('POST /', async function saveUser (req, res) {
  const user = await json(req)
  const created = await db.saveUser(user)

  delete created.email
  delete created.password

  send(res, 201, created)
})

hash.set('GET /:username', async function getUser (req, res, params) {
  const user = await db.getUser(params.username)

  delete user.email
  delete user.password

  send(res, 200, user)
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
