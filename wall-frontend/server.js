const express = require('express')
const passport = require('passport');
const expressSession = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const wall = require('../wall-client')
const auth = require('./lib/auth');
const config = require('./config')

const app = express();
const client = wall.createClient(config.client)
const port = process.env.PORT || 3000

app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(`${__dirname}/public`))

passport.use(auth.localStrategy)
passport.serializeUser(auth.serializeUser)
passport.deserializeUser(auth.deserializeUser)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signup', (req, res) => {
  res.render('index')
})

app.post('/signup', (req, res) => {
  client.saveUser(req.body, (err, user) => {
    if (err) return res.send(err.message)
    res.send({ message: 'User created' })
  })
})

app.get('/signin', (req, res) => {
  res.render('index')
})

app.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

app.get('/whoami', (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user)
  res.json({ auth: false })
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.post('/api/post', (req, res) => {
  client.savePost(req.body, req.user.token, (err, post) => {
    if (err) return res.send(err.message)
    res.send(post)
  })
})

app.get('/api/post/list', (req, res) => {
  client.listPosts((err, posts) => {
    if (err) return res.send(err.message)
    res.send(posts)
  })
})

app.listen(port, () => console.log(`App listening on port ${port}`))
