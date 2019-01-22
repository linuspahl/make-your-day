// Models index file
// Will setup all existing models
// The models provide all definitons needed for the database setup
import sequelize from '../core/sequelize'
import Category from './category/category'
import Setting from './setting/setting'
import User from './user/user'
import UserSetting from './userSetting/userSetting'
import Widget from './widget/widget'

// Initialize models
const models = {}

models.Category = Category(sequelize)
models.Widget = Widget(sequelize)
models.UserSetting = UserSetting(sequelize)
models.Setting = Setting(sequelize, models)
models.User = User(sequelize, models)

export default models
