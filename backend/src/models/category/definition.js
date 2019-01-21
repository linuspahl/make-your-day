import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('category', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: Sequelize.STRING,
    unit: Sequelize.STRING,
    icon: Sequelize.STRING,
    color: Sequelize.STRING,
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isIn: [['journal', 'list', 'counter']] },
    },
    hasTitle: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    hasDescription: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    hasUnit: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    hasSubcategories: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    dailyUsage: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
  })
