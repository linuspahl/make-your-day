export default (sequelize, DataTypes) =>
  sequelize.define('userSession', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    device: { allowNull: false, type: DataTypes.STRING },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    expiresAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  })
