'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('widgets', 'position', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'dashboard-bottom',
      validate: { isIn: [['dashboard-bottom', 'dashboard-top']] },
    }),

  down: queryInterface => queryInterface.removeColumn('widgets', 'position'),
}
