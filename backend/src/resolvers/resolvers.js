// Graphql resolvers
// The resolvers will us the sequelize models to resolve the qraphql query / mutation
// For each query / mutation a resolver exists
// Gets included in the apollo server setup

// Mutations import
import loginUser from './mutation/loginUser'
import createCategory from './mutation/createCategory'
import updateCategory from './mutation/updateCategory'
import createUserSetting from './mutation/createUserSetting'
import deleteUserSetting from './mutation/deleteUserSetting'
// Queries import
import getCategories from './query/getCategories'
import getCategory from './query/getCategory'
import getSettings from './query/getSettings'
// Queries relation resolvers import
import getUserUserSettings from './query/getUserUserSettings'
import getUserSettingSetting from './query/getUserSettingSetting'

export default {
  User: {
    userSettings: getUserUserSettings,
  },
  UserSetting: {
    setting: getUserSettingSetting,
  },
  Mutation: {
    loginUser,
    createCategory,
    updateCategory,
    createUserSetting,
    deleteUserSetting,
  },
  Query: {
    getCategory,
    getCategories,
    getSettings,
  },
}
