'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: Sequelize.STRING,
        unit: Sequelize.STRING,
        icon: Sequelize.STRING,
        color: Sequelize.STRING,
        type: Sequelize.STRING,
        hasTitle: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        hasDescription: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        hasUnit: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        hasSubcategories: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        dailyUsage: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        userId: {
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

  down: queryInterface => {
    return queryInterface.dropTable('categories')
  },
}
