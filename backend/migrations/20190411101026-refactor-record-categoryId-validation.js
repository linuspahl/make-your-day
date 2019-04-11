'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('records', 'categoryId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: true,
      },
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('records', 'categoryId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    }),
}
