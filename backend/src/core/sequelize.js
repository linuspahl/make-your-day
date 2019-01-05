// Setup file for Sequelize the databse orm
// Gets included by the models

import config from '../../config/config'

import Sequelize from 'sequelize'

// Get database config
const {
  db: { name, user, password, host },
} = config

// Setup sequelize operation aliases.
// Makes it easier to write database actions
const Op = Sequelize.Op
const operatorsAliases = {
  $and: Op.and,
  $in: Op.and,
  $gt: Op.gt,
  $lt: Op.lt,
}

export default new Sequelize(name, user, password, {
  host,
  dialect: 'postgres',
  operatorsAliases,
})
