import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    unit: Sequelize.STRING,
    icon: Sequelize.STRING,
    color: Sequelize.STRING,
    type: Sequelize.STRING,
    hasTitle: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hasDescription: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hasUnit: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hasSubcategories: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dailyUsage: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })
