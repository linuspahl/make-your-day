'use strict'

module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.changeColumn('widgets', 'type', {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isIn: [['textarea', 'timeline']] },
    }),

  down: (queryInterface, DataTypes) =>
    queryInterface.changeColumn('widgets', 'type', {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isIn: [['textarea']] },
    }),
}
