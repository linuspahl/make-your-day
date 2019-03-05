// Models index file
// Will setup all existing models
// The models provide all definitons needed for the database setup
import sequelize from '../core/sequelize'

// We need to use sequelize import method to call every model definition
const models = {
  Record: sequelize.import('./record/record'),
  Evaluation: sequelize.import('./evaluation/evaluation'),
  Widget: sequelize.import('./widget/widget'),
  Category: sequelize.import('./category/category'),
  UserSetting: sequelize.import('./userSetting/userSetting'),
  Setting: sequelize.import('./setting/setting'),
  User: sequelize.import('./user/user'),
  UserSession: sequelize.import('./userSession/userSession'),
}

// When we finished all model creations, we can define all relations.
// All model relations are defined in the model associate attribute.
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export default models
