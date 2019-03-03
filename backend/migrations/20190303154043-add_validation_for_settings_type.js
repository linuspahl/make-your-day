'use strict'

module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.changeColumn('settings', 'type', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isIn: [['nightMode', 'leftHandMode', 'showAppBgImage']],
      },
    }),

  down: (queryInterface, DataTypes) =>
    queryInterface.changeColumn('settings', 'type', {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['nightMode', 'leftHandMode', 'showAppBgImage']],
      },
    }),
}
