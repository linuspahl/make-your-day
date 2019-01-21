import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('setting', {
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
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isIn: [['nightMode', 'leftHandMode', 'showAppBgImage']] },
    },
    defaultValue: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.STRING,
    },
  })
