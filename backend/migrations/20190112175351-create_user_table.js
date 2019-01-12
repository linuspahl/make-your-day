'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      passwordHash: { type: Sequelize.STRING, allowNull: false },
      token: Sequelize.STRING,
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isIn: [['admin', 'user']] },
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  },
}
