'use strict'

module.exports = {
  up: queryInterface =>
    queryInterface
      .removeConstraint('widgets', 'widgets_evaluationId_fkey')
      .then(() =>
        queryInterface.addConstraint('widgets', ['evaluationId'], {
          type: 'foreign key',
          name: 'widgets_evaluationId_fkey',
          references: {
            table: 'evaluations',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        })
      ),

  down: queryInterface =>
    queryInterface
      .removeConstraint('widgets', 'widgets_evaluationId_fkey')
      .then(() =>
        queryInterface.addConstraint('widgets', ['evaluationId'], {
          type: 'foreign key',
          name: 'widgets_evaluationId_fkey',
          references: {
            table: 'evaluations',
            field: 'id',
          },
          onUpdate: 'SET NULL',
          onDelete: 'SET NULL',
        })
      ),
}
