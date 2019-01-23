import definition from './definition'
import login from './login'

export default (sequelize, models) => {
  const { Category, UserSetting, Widget, Record } = models
  const User = definition(sequelize)

  // model actions
  User.login = params => login(User, params)

  // model relations
  User.hasMany(Category, { onDelete: 'cascade', onUpdate: 'cascade' })
  User.hasMany(Widget, { onDelete: 'cascade', onUpdate: 'cascade' })
  User.hasMany(UserSetting, { onDelete: 'cascade', onUpdate: 'cascade' })
  User.hasMany(Record, { onDelete: 'cascade', onUpdate: 'cascade' })

  return User
}
