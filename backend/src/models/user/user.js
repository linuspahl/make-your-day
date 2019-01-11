import definition from './definition'
import login from './login'

export default (sequelize, models) => {
  const { Category } = models
  const User = definition(sequelize)

  // model actions
  User.login = params => login(User, params)

  // model relations
  User.hasMany(Category, { onDelete: 'cascade' })

  return User
}
