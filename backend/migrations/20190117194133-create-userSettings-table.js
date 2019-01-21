'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('userSettings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        value: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.STRING,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        settingId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint('userSettings', ['userId'], {
          type: 'foreign key',
          name: 'userSettings_userId_fkey',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      )
      .then(() =>
        queryInterface.addConstraint('userSettings', ['settingId'], {
          type: 'foreign key',
          name: 'settings_userId_fkey',
          references: {
            table: 'settings',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      )
      .then(() =>
        queryInterface.addIndex('userSettings', ['settingId'], {
          unique: true,
          fields: ['id', 'userId'],
        })
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('userSettings')
  },
}
