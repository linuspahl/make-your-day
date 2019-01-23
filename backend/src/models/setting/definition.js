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
      allowNull: false,
      type: Sequelize.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { isIn: [['nightMode', 'leftHandMode', 'showAppBgImage']] },
    },
    defaultValue: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.STRING,
    },
  })
