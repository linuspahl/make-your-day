// Models index file
// Will setup all existing models
// The models provide all definitons needed for the database setup

import UserModel from './user'

export default sequelize => {
  let models = {}

  models.User = UserModel(sequelize)

  return models
}
