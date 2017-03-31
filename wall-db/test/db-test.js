import test from 'ava'
import Db from '../'
import utils from '../lib/utils'
import fixtures from './fixtures'

const db = new Db()

test.before('Setup Database', async t => {
  t.is(typeof db.setup, 'function', 'Should be a function')
  await db.setup()
})

test.after.always('Cleanup Database', async t => {
  t.is(typeof db.dropTables, 'function', 'Should be a function')
  await db.dropTables()
})

test('Save user', async t => {
  t.is(typeof db.saveUser, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const created = await db.saveUser(user)
  const result = created.get({ plain: true })
  const passwordEncrypted = utils.encrypt(user.password)

  t.is(result.id, user.id)
  t.is(result.username, user.username)
  t.is(result.password, passwordEncrypted)
  t.is(result.email, user.email)
  t.throws(db.saveUser(null), /no data/)
})

test('Get user', async t => {
  t.is(typeof db.getUser, 'function', 'Should be a function')

  const user = fixtures.getUser()
  await db.saveUser(user)
  const found = await db.getUser(user.username)
  const result = found.get({ plain: true })
  const passwordEncrypted = utils.encrypt(user.password)

  t.is(result.id, user.id)
  t.is(result.username, user.username)
  t.is(result.password, passwordEncrypted)
  t.is(result.email, user.email)
  t.throws(db.getUser('foo'), /not found/)
})

test('Save post', async t => {
  t.is(typeof db.savePost, 'function', 'Should be a function')

  const user = fixtures.getUser()
  await db.saveUser(user)

  const post = fixtures.getPost()
  post.userId = user.id

  const created = await db.savePost(post)
  const result = created.get({ plain: true })

  t.is(result.id, post.id)
  t.is(result.content, post.content)
  t.is(result.userId, post.userId)
  t.throws(db.saveUser(null), /no data/)
})

test('List posts', async t => {
  t.is(typeof db.listPosts, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const posts = fixtures.getPosts()
  const savePosts = []

  posts.forEach(post => {
    const newPost = post.userId = user.id
    savePosts.push(db.savePost(newPost))
  })

  await db.saveUser(user)
  await Promise.all(savePosts)

  const result = await db.listPosts()

  t.truthy(result.length)
})

test('Authenticate user', async t => {
  t.is(typeof db.authenticate, 'function', 'Should be a function')

  const user = fixtures.getUser()
  const plainPassword = user.password
  await db.saveUser(user)

  const success = await db.authenticate(user.username, plainPassword)
  t.true(success)

  const fail = await db.authenticate(user.username, 'foo')
  t.false(fail)

  const failure = await db.authenticate('foo', 'bar')
  t.false(failure)
})
