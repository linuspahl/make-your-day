// Graphql resolvers
// The resolvers will us the sequelize models to resolve the qraphql query / mutation
// For each query / mutation a resolver exists
// Gets included in the apollo server setup

// Mutations import
import loginUser from './mutation/loginUser'
import createCategory from './mutation/createCategory'
import updateCategory from './mutation/updateCategory'
// Queries import
import getCategories from './query/getCategories'
import getCategory from './query/getCategory'

export default {
  Mutation: {
    loginUser,
    createCategory,
    updateCategory,
  },
  Query: {
    getCategory,
    getCategories,
  },
}
