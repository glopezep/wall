import 'babel-register'
import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise-native'
import fixtures from './fixtures'
import users from '../users'

test.beforeEach(async t => {
  const srv = micro(users)
  t.context.url = await listen(srv)
})

test('POST /', async t => {
  const user = fixtures.getUser()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: url,
    json: true,
    body: user,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  delete user.email
  delete user.password

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, user)
})

test('GET /:username', async t => {
  const user = fixtures.getUser()
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/${user.username}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  delete user.email
  delete user.password

  t.is(response.statusCode, 200)
  t.deepEqual(response.body.username, user.username)
})
