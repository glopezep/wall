import 'babel-register'
import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise-native'
import fixtures from './fixtures'
import auth from '../auth'
import utils from '../lib/utils'
import config from '../config'

test.beforeEach(async t => {
  const srv = micro(auth)
  t.context.url = await listen(srv)
})

test('Success POST /', async t => {
  const user = fixtures.getUser()
  const url = t.context.url
  const options = {
    method: 'POST',
    uri: url,
    body: {
      username: user.username,
      password: user.password
    },
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)
  const token = response.body
  const decoded = await utils.verifyToken(token, config.secret)

  t.is(response.statusCode, 200)
  t.is(decoded.username, user.username)
})
