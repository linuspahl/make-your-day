import Sequelize from 'sequelize'

export default sequelize =>
  sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    passwordHash: { type: Sequelize.STRING, allowNull: false },
    token: Sequelize.STRING,
    role: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: { isIn: [['admin', 'user']] },
    },
  })
