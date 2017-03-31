const config = {
  secret: process.env.SECRET || 'w4ll',
  client: {
    endpoints: {
      posts: 'http://api.wall.com/post',
      users: 'http://api.wall.com/user',
      auth: 'http://api.wall.com/auth'
    }
  }
}

if (process.env.NODE_ENV !== "production") {
  config.client.endpoints = {
    posts: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }
}

module.exports = config
