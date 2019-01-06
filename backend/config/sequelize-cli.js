// We need babel-register to import the es5 config
require('@babel/register')

// Config file for sequelize cli usage
// Gets included in the yarn sequelize script
const config = require('./config')

const {
  default: {
    db: { user, password, name, host },
  },
} = config

module.exports = {
  development: {
    username: user,
    password: password,
    database: name,
    host: host,
    dialect: 'postgres',
  },
}
