import test from 'ava'
import nock from 'nock'
import wall from '../'
import fixtures from './fixtures'

const options = {
  endpoints: {
    posts: 'http://wall.test/post',
    users: 'http://wall.test/user',
    auth: 'http://wall.test/auth'
  }
}

test.beforeEach(t => {
  t.context.client = wall.createClient(options)
})

test('client', t => {
  const client = t.context.client

  t.is(typeof client.savePost, 'function')
  t.is(typeof client.listPosts, 'function')
  t.is(typeof client.saveUser, 'function')
  t.is(typeof client.getUser, 'function')
  t.is(typeof client.authenticate, 'function')
})

test('Save post', async t => {
  const client = t.context.client
  const post = fixtures.getPost()
  const token = 'xxx-xxx-xxx'

  nock(options.endpoints.posts, {
    reqheaders: {
      'Authorization': `Bearer ${token}`
    }
  })
  .post('/', post)
  .reply(201, post)

  const result = await client.savePost(post, token)
  t.deepEqual(result, post)
})

test('List posts', async t => {
  const client = t.context.client
  const posts = fixtures.getPosts()

  nock(options.endpoints.posts)
  .get('/list')
  .reply(200, posts)

  const result = await client.listPosts()
  t.deepEqual(result, posts)
})

test('Save user', async t => {
  const client = t.context.client
  const user = fixtures.getUser()

  nock(options.endpoints.users)
  .post('/', user)
  .reply(201, user)

  const result = await client.saveUser(user)
  t.deepEqual(result, user)
})

test('Get user', async t => {
  const client = t.context.client
  const user = fixtures.getUser()

  nock(options.endpoints.users)
  .get(`/${user.username}`)
  .reply(200, user)

  const result = await client.getUser(user.username)
  t.deepEqual(result, user)
})

test('Authenticate user', async t => {
  const client = t.context.client
  const user = fixtures.getUser()
  const token = 'xxx-xxx-xxx'

  nock(options.endpoints.auth)
  .post('/', {
    username: user.username,
    password: user.password
  })
  .reply(200, token)

  const result = await client.authenticate(user.username, user.password)
  t.deepEqual(result, token)
})
