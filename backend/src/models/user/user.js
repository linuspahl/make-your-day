import definition from './definition'
import login from './login'

export default (sequelize, DataTypes) => {
  const User = definition(sequelize, DataTypes)

  // model actions
  User.login = params => login(User, params)

  // model relations
  User.associate = models => {
    User.hasMany(models.Category, { onDelete: 'cascade', onUpdate: 'cascade' })
    User.hasMany(models.Widget, { onDelete: 'cascade', onUpdate: 'cascade' })
    User.hasMany(models.UserSetting, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    User.hasMany(models.Record, { onDelete: 'cascade', onUpdate: 'cascade' })
  }

  return User
}
