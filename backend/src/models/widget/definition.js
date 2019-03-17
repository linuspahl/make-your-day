export default (sequelize, DataTypes) =>
  sequelize.define('widget', {
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
      validate: { isIn: [['textarea', 'timeline', 'evaluation']] },
    },
    position: {
      allowNull: false,
      defaultValue: 'dashboard-bottom',
      type: DataTypes.STRING,
      validate: { isIn: [['dashboard-bottom', 'dashboard-top']] },
    },
    value: DataTypes.TEXT,
  })
