export default (sequelize, DataTypes) =>
  sequelize.define('userSession', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    device: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    expiresAt: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
      },
    },
  })
