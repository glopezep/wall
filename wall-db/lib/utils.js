const crypto = require('crypto')

function encrypt (password) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

module.exports = {
  encrypt
}
