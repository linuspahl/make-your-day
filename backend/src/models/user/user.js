import definition from './definition'
import login from './login'

export default (sequelize, models) => {
  const { Category, UserSetting, Widget } = models
  const User = definition(sequelize)

  // model actions
  User.login = params => login(User, params)

  // model relations
  User.hasMany(Category, { onDelete: 'cascade' })
  User.hasMany(Widget, { onDelete: 'cascade' })
  User.hasMany(UserSetting, { onDelete: 'cascade' })

  return User
}
