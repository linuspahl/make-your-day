// Models index file
// Will setup all existing models
// The models provide all definitons needed for the database setup
import sequelize from '../core/sequelize'
import User from './user/user'
import Category from './category/category'

// Initialize models
const models = {}

models.Category = Category(sequelize)
models.User = User(sequelize, models)

export default models
