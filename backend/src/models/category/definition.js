import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: Sequelize.STRING,
    unit: Sequelize.STRING,
    icon: Sequelize.STRING,
    color: Sequelize.STRING,
    type: {
      allowNull: false,
      type: Sequelize.STRING,
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
