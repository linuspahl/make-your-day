import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: { type: Sequelize.STRING, allowNull: false },
    token: Sequelize.STRING,
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isIn: [['admin', 'user']] },
    },
  })
