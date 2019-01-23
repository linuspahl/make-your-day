// Graphql resolvers
// The resolvers will us the sequelize models to resolve the qraphql query / mutation
// For each query / mutation a resolver exists
// Gets included in the apollo server setup

// Mutations import
import createCategory from './mutation/createCategory'
import createRecord from './mutation/createRecord'
import createUserSetting from './mutation/createUserSetting'
import createWidget from './mutation/createWidget'
import deleteUserSetting from './mutation/deleteUserSetting'
import loginUser from './mutation/loginUser'
import updateCategory from './mutation/updateCategory'
import updateWidget from './mutation/updateWidget'
// Queries import
import getCategories from './query/getCategories'
import getCategory from './query/getCategory'
import getRecords from './query/getRecords'
import getSettings from './query/getSettings'
import getWidgets from './query/getWidgets'
import getWidget from './query/getWidget'
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
    createCategory,
    createRecord,
    createUserSetting,
    createWidget,
    deleteUserSetting,
    loginUser,
    updateCategory,
    updateWidget,
  },
  Query: {
    getCategory,
    getCategories,
    getRecords,
    getSettings,
    getWidgets,
    getWidget,
  },
}
