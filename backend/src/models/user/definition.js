export default (sequelize, DataTypes) =>
  sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isIn: [['admin', 'user']] },
    },
  })
