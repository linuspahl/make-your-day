'use strict'

// Starting with this migration, we will use Promise.all([]) to combine queryInterface actions

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('categories', 'parentId', {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
      queryInterface.addColumn('categories', 'processedAt', {
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('categories', 'type', {
        allowNull: false,
        type: Sequelize.STRING,
        validate: { isIn: [['journal', 'list', 'counter']] },
      }),
    ]),
  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn('categories', 'parentId'),
      queryInterface.removeColumn('categories', 'processedAt'),
      queryInterface.changeColumn('categories', 'type', {
        type: Sequelize.STRING,
      }),
    ]),
}
