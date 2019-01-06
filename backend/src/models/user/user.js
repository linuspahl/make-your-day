import definition from './definition'
import login from './login'

export default sequelize => {
  const User = definition(sequelize)

  // define model actions
  User.login = params => login(User, params)

  return User
}
