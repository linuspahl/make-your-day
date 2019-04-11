'use strict'

// This migration will convert the record amount from strings to decimals.
// Before casting the column, we need to prepare the existing data.

module.exports = {
  up: queryInterface =>
    queryInterface.sequelize
      // So far the record amount is allways a number.
      // (Thats the reason want to convert the column)
      // Because the format is currently a string, and the amount could
      // technically be a string, we will simply select all none numbers
      // and change them to a one.
      .query(
        `
        UPDATE records
        SET amount = 1
        WHERE amount !~ '[0-9]'
      `
      )
      .then(() =>
        // We also need to make sure, that no comma is used for current decimals.
        // Only dots will be used / will be valid.
        queryInterface.sequelize.query(
          `
          UPDATE records
          SET amount = replace(amount, ',', '.')
        `
        )
      )
      .then(() =>
        queryInterface.changeColumn('records', 'amount', {
          type: 'DECIMAL USING CAST("amount" as DECIMAL(10, 2))',
        })
      ),
  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('records', 'amount', {
      type: Sequelize.STRING,
    }),
}
