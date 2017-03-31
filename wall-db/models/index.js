const Sequelize = require('sequelize')
const sequelize = require('../lib/sequelize')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.CHAR(36),
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['username']
    }
  ]
})

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.CHAR(36),
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  content: {
    type: Sequelize.STRING
  }
})

Post.belongsTo(User)

module.exports = {
  User,
  Post
}
