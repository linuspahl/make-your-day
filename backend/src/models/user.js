import Sequelize from 'sequelize'

export default sequelize => {
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
}
