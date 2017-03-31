module.exports = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbConfig: {
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
