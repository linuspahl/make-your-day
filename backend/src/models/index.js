// Models index file
// Will setup all existing models
// The models provide all definitons needed for the database setup
import sequelize from '../core/sequelize'
import User from './user/user'
import Category from './category/category'
import Setting from './setting/setting'
import UserSetting from './userSetting/userSetting'

// Initialize models
const models = {}

models.Category = Category(sequelize)
models.UserSetting = UserSetting(sequelize)
models.Setting = Setting(sequelize, models)
models.User = User(sequelize, models)

export default models
