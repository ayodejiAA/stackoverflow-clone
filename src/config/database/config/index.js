module.exports = {
  development: {
    username: 'ayodeji',
    password: 'ayodeji',
    database: 'ayo_db',
    dialect: 'mysql',
    host: '127.0.0.1',
  },
  test: {
    username: 'ayodeji',
    password: 'ayodeji',
    database: 'ayo_db_test',
    dialect: 'mysql',
    host: '127.0.0.1',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    host: '127.0.0.1',
    logging: false,
  },
};
