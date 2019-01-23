import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('record', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    amount: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
  })
