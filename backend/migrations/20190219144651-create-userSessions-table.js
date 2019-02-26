'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface
        .createTable('userSessions', {
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
          token: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          device: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          expiresAt: {
            allowNull: false,
            type: Sequelize.DATE,
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
          queryInterface.addConstraint('userSessions', ['userId'], {
            type: 'foreign key',
            name: 'userSessions_userId_fkey',
            references: {
              table: 'users',
              field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
          })
        )
        // We could move all existing sessions here to the new table.
        // But for now it is fine, that the user needs to login again
        .then(() => queryInterface.removeColumn('users', 'token'))
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable('userSessions')
      .then(() =>
        queryInterface.addColumn('users', 'token', { type: Sequelize.STRING })
      )
  },
}
