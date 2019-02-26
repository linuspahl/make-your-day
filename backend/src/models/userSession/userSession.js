import definition from './definition'

export default (sequelize, DataTypes) => {
  const UserSession = definition(sequelize, DataTypes)
  UserSession.associate = models => {
    UserSession.belongsTo(models.User)
  }
  return UserSession
}
