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
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { isIn: [['textarea']] },
    },
    value: Sequelize.TEXT,
  })
