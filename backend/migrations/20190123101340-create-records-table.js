'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('records', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: Sequelize.STRING,
        amount: Sequelize.STRING,
        description: Sequelize.TEXT,
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        categoryId: {
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
        queryInterface.addConstraint('records', ['userId'], {
          type: 'foreign key',
          name: 'records_userId_fkey',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      )
      .then(() =>
        queryInterface.addConstraint('records', ['categoryId'], {
          type: 'foreign key',
          name: 'records_categoryId_fkey',
          references: {
            table: 'categories',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('records')
  },
}
