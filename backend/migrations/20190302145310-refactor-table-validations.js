'use strict'

module.exports = {
  up: function(queryInterface, DataTypes) {
    return (
      queryInterface
        // category table
        .changeColumn('categories', 'title', {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        })
        // setting table
        .then(() =>
          queryInterface.changeColumn('settings', 'title', {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
        // user table
        .then(() =>
          queryInterface.changeColumn('users', 'username', {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
        .then(() =>
          queryInterface.changeColumn('users', 'passwordHash', {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
        // userSession table
        .then(() =>
          queryInterface.changeColumn('userSessions', 'device', {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
        .then(() =>
          queryInterface.changeColumn('userSessions', 'token', {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
        .then(() =>
          queryInterface.changeColumn('userSessions', 'expiresAt', {
            allowNull: false,
            type: DataTypes.DATE,
            validate: {
              notEmpty: true,
            },
          })
        )
        // userSetting table
        .then(() =>
          queryInterface.changeColumn('userSettings', 'value', {
            allowNull: false,
            defaultValue: true,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
        // widget table
        .then(() =>
          queryInterface.changeColumn('widgets', 'title', {
            allowNull: false,
            defaultValue: true,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          })
        )
    )
  },
  down: (queryInterface, DataTypes) => {
    return (
      queryInterface
        // category table
        .changeColumn('categories', 'title', {
          type: DataTypes.STRING,
        })
        // setting table
        .then(() => {
          queryInterface.changeColumn('settings', 'title', {
            allowNull: false,
            type: DataTypes.STRING,
          })
        })
        // user table
        .then(() =>
          queryInterface.changeColumn('users', 'username', {
            allowNull: false,
            type: DataTypes.STRING,
          })
        )
        .then(() =>
          queryInterface.changeColumn('users', 'passwordHash', {
            allowNull: false,
            type: DataTypes.STRING,
          })
        )
        // userSession table
        .then(() =>
          queryInterface.changeColumn('userSessions', 'device', {
            allowNull: false,
            type: DataTypes.STRING,
          })
        )
        .then(() =>
          queryInterface.changeColumn('userSessions', 'token', {
            allowNull: false,
            type: DataTypes.STRING,
          })
        )
        .then(() =>
          queryInterface.changeColumn('userSessions', 'expiresAt', {
            allowNull: false,
            type: DataTypes.DATE,
          })
        )
        // userSetting table
        .then(() =>
          queryInterface.changeColumn('userSettings', 'value', {
            allowNull: false,
            defaultValue: true,
            type: DataTypes.STRING,
          })
        )
        // widget table
        .then(() =>
          queryInterface.changeColumn('widgets', 'title', {
            allowNull: false,
            defaultValue: true,
            type: DataTypes.STRING,
          })
        )
    )
  },
}
