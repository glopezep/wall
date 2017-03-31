const LocalStrategy = require('passport-local').Strategy
const wall = require('../../wall-client')
const config = require('../config');

const client = wall.createClient(config.client)

const localStrategy = new LocalStrategy((username, password, done) => {
  client.authenticate(username, password, (err, token) => {
    if (err) return done(null, false, { message: 'username and password not found' })

    client.getUser(username, (err, user) => {
      if (err) return done(null, false, { message: `an error ocurred: ${err.message}` })

      user.token = token
      return done(null, user)
    })
  })
})

function serializeUser(user, done) {
  done(null, {
    username: user.username,
    token: user.token
  })
}

function deserializeUser(user, done) {
  client.getUser(user.username, (err, usr) => {
    if (err) return done(err)

    usr.token = user.token
    done(null, usr)
  })
}

module.exports = {
  localStrategy,
  serializeUser,
  deserializeUser
}
