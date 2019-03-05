'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('evaluations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        categoryId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            notEmpty: true,
          },
        },
        type: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: { isIn: [['list', 'barchart', 'linechart', 'piechart']] },
        },
        groupSubcategories: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        period: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.STRING,
          validate: {
            isIn: [
              ['day', 'month', 'year', 'lastDay', 'lastMonth', 'lastYear'],
            ],
          },
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
        queryInterface.addConstraint('evaluations', ['userId'], {
          type: 'foreign key',
          name: 'evaluations_userId_fkey',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      )
      .then(() =>
        queryInterface.addConstraint('evaluations', ['categoryId'], {
          type: 'foreign key',
          name: 'evaluations_categoryId_fkey',
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
    return queryInterface.dropTable('evaluations')
  },
}
