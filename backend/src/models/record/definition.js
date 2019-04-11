export default (sequelize, DataTypes) =>
  sequelize.define('record', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      // The amount can be a decimal number like 19,99
      // But most values will be whole numbers
      type: DataTypes.DECIMAL(10, 2),
      get() {
        // Sine the DECIMAL type definition will add some decimals,
        // even for whole numbers (e.g. 55 will result in 55,00)
        // we need to format the output manually.
        // This way the user will allways see the number in a constant format.

        const amount = this.getDataValue('amount')
        // Does the amount has mo decimals? E.g. 55,00
        if (amount % 1 == 0) {
          // Return without decimals. E.g. 55
          return Math.trunc(amount)
        }

        // Otherwise return with decimals. E.g. 19,99
        return amount
      },
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  })
