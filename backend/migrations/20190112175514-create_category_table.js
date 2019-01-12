'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('categories', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: Sequelize.STRING,
        unit: Sequelize.STRING,
        icon: Sequelize.STRING,
        color: Sequelize.STRING,
        type: Sequelize.STRING,
        hasTitle: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        hasDescription: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        hasUnit: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        hasSubcategories: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        dailyUsage: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      })
      .then(() =>
        queryInterface.addConstraint('categories', ['userId'], {
          type: 'foreign key',
          name: 'categories_userId_fkey',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories')
  },
}
