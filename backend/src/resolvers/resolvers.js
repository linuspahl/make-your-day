// Graphql resolvers
// The resolvers will us the sequelize models to resolve the qraphql query / mutation
// For each query / mutation a resolver exists
// Gets included in the apollo server setup

import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'

// Mutations import
import createCategory from './mutation/createCategory'
import createRecord from './mutation/createRecord'
import createSubcategory from './mutation/createSubcategory'
import createUserSetting from './mutation/createUserSetting'
import createWidget from './mutation/createWidget'
import deleteCategory from './mutation/deleteCategory'
import deleteRecord from './mutation/deleteRecord'
import deleteUserSetting from './mutation/deleteUserSetting'
import deleteUserSession from './mutation/deleteUserSession'
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
import getUserSessions from './query/getUserSessions'
import getUserUserSession from './query/getUserUserSession'
import getWidget from './query/getWidget'
import getWidgets from './query/getWidgets'
// Queries relation resolvers import
import getUserUserSettings from './query/getUserUserSettings'
import getUserSettingSetting from './query/getUserSettingSetting'
import getRecordCategory from './query/getRecordCategory'
import getCategorySubcategories from './query/getCategorySubcategories'
import getCategoryParent from './query/getCategoryParent'

export default {
  Login: {
    userSettings: getUserUserSettings,
    userSession: getUserUserSession,
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
    createCategory: combineResolvers(isAuthenticated, createCategory),
    createRecord: combineResolvers(isAuthenticated, createRecord),
    createSubcategory: combineResolvers(isAuthenticated, createSubcategory),
    createUserSetting: combineResolvers(isAuthenticated, createUserSetting),
    createWidget: combineResolvers(isAuthenticated, createWidget),
    deleteCategory: combineResolvers(isAuthenticated, deleteCategory),
    deleteRecord: combineResolvers(isAuthenticated, deleteRecord),
    deleteUserSetting: combineResolvers(isAuthenticated, deleteUserSetting),
    deleteUserSession: combineResolvers(isAuthenticated, deleteUserSession),
    deleteWidget: combineResolvers(isAuthenticated, deleteWidget),
    loginUser: loginUser,
    updateCategory: combineResolvers(isAuthenticated, updateCategory),
    updateRecord: combineResolvers(isAuthenticated, updateRecord),
    updateWidget: combineResolvers(isAuthenticated, updateWidget),
  },
  Query: {
    getCategory: combineResolvers(isAuthenticated, getCategory),
    getCategories: combineResolvers(isAuthenticated, getCategories),
    getRecords: combineResolvers(isAuthenticated, getRecords),
    getRecord: combineResolvers(isAuthenticated, getRecord),
    getSettings: combineResolvers(isAuthenticated, getSettings),
    getUserSessions: combineResolvers(isAuthenticated, getUserSessions),
    getWidgets: combineResolvers(isAuthenticated, getWidgets),
    getWidget: combineResolvers(isAuthenticated, getWidget),
  },
}
