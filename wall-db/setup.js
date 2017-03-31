const Db = require('./')

const db = new Db()

db.setup().then((data) => {
  console.log(data)
  process.exit()
}).catch(err => {
  console.log(err)
})
