// Models index file
// Will setup all existing models
// The models provide all definitons needed for the database setup
import UserModel from './user/user'
import sequelize from '../core/sequelize'

const models = {}

models.User = UserModel(sequelize)

export default models
