import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('record', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    amount: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
  })
