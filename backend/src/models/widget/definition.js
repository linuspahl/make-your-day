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
    value: Sequelize.TEXT,
  })
