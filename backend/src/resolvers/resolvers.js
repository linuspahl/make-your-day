// Graphql resolvers
// The resolvers will us the sequelize models to resolve the qraphql query / mutation
// For each query / mutation a resolver exists
// Gets included in the apollo server setup

// Mutations import
import createCategory from './mutation/createCategory'
import createRecord from './mutation/createRecord'
import createSubcategory from './mutation/createSubcategory'
import createUserSetting from './mutation/createUserSetting'
import createWidget from './mutation/createWidget'
import deleteCategory from './mutation/deleteCategory'
import deleteRecord from './mutation/deleteRecord'
import deleteUserSetting from './mutation/deleteUserSetting'
import deleteWidget from './mutation/deleteWidget'
import loginUser from './mutation/loginUser'
import updateCategory from './mutation/updateCategory'
import updateRecord from './mutation/updateRecord'
import updateWidget from './mutation/updateWidget'
// Queries import
import getCategories from './query/getCategories'
import getCategory from './query/getCategory'
import getRecord from './query/getRecord'
import getRecords from './query/getRecords'
import getSettings from './query/getSettings'
import getWidget from './query/getWidget'
import getWidgets from './query/getWidgets'
// Queries relation resolvers import
import getUserUserSettings from './query/getUserUserSettings'
import getUserSettingSetting from './query/getUserSettingSetting'
import getRecordCategory from './query/getRecordCategory'
import getCategorySubcategories from './query/getCategorySubcategories'
import getCategoryParent from './query/getCategoryParent'

export default {
  User: {
    userSettings: getUserUserSettings,
  },
  UserSetting: {
    setting: getUserSettingSetting,
  },
  Record: {
    category: getRecordCategory,
  },
  Category: {
    subcategories: getCategorySubcategories,
    parent: getCategoryParent,
  },
  Mutation: {
    createCategory,
    createRecord,
    createSubcategory,
    createUserSetting,
    createWidget,
    deleteCategory,
    deleteRecord,
    deleteUserSetting,
    deleteWidget,
    loginUser,
    updateCategory,
    updateRecord,
    updateWidget,
  },
  Query: {
    getCategory,
    getCategories,
    getRecords,
    getRecord,
    getSettings,
    getWidgets,
    getWidget,
  },
}
