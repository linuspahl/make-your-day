import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define(
    'userSetting',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [{ unique: true, fields: ['id', 'userId'] }],
    }
  )
