export default (sequelize, DataTypes) =>
  sequelize.define('record', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  })
