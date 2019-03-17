'use strict'

module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface
      .changeColumn('widgets', 'type', {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [['textarea', 'timeline', 'evaluation']] },
      })
      .then(() => {
        queryInterface.addColumn('widgets', 'evaluationId', {
          type: DataTypes.INTEGER,
        })
      })
      .then(() =>
        queryInterface.addConstraint('widgets', ['evaluationId'], {
          type: 'foreign key',
          name: 'widgets_evaluationId_fkey',
          references: {
            table: 'evaluations',
            field: 'id',
          },
        })
      ),

  down: (queryInterface, DataTypes) =>
    queryInterface
      .changeColumn('widgets', 'type', {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [['textarea', 'timeline']] },
      })
      .then(() => {
        queryInterface.removeColumn('widgets', 'evaluationId')
      }),
}
