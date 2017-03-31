import 'babel-register'
import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise-native'
import fixtures from './fixtures'
import posts from '../posts'
import utils from '../lib/utils'
import config from '../config'

test.beforeEach(async t => {
  const srv = micro(posts)
  t.context.url = await listen(srv)
})

test('Secure POST /', async t => {
  const post = fixtures.getPost()
  const url = t.context.url
  const token = await utils.signToken({
    userId: post.userId,
    username: post.userId
  }, config.secret)

  const options = {
    method: 'POST',
    uri: url,
    body: post,
    json: true,
    resolveWithFullResponse: true,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const response = await request(options)
  t.is(response.statusCode, 201)
  t.deepEqual(response.body, post)
})

test('GET /list', async t => {
  const url = t.context.url
  const options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)
  t.is(response.statusCode, 200)
  t.truthy(response.body.length)
})
