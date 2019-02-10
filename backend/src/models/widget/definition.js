import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('widget', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { isIn: [['textarea']] },
    },
    position: {
      allowNull: false,
      defaultValue: 'dashboard-bottom',
      type: Sequelize.STRING,
      validate: { isIn: [['dashboard-bottom', 'dashboard-top']] },
    },
    value: Sequelize.TEXT,
  })
