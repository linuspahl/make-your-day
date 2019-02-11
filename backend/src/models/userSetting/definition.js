export default (sequelize, DataTypes) =>
  sequelize.define(
    'userSetting',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      value: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.STRING,
      },
    },
    {
      indexes: [{ unique: true, fields: ['id', 'userId'] }],
    }
  )
