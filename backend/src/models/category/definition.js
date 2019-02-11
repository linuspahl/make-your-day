export default (sequelize, DataTypes) =>
  sequelize.define('category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    unit: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isIn: [['journal', 'list', 'counter']] },
    },
    hasTitle: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    hasDescription: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    hasUnit: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    hasSubcategories: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    dailyUsage: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  })
