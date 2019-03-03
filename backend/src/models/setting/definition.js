export default (sequelize, DataTypes) =>
  sequelize.define('setting', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isIn: [['nightMode', 'leftHandMode', 'showAppBgImage']],
      },
    },
    defaultValue: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.STRING,
    },
  })
