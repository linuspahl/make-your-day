// Graphql resolvers
// The resolvers will us the sequelize models to resolve the qraphql query / mutation
// For each query / mutation a resolver exists
// Gets included in the apollo server setup

// Mutations import
import loginUser from './mutation/loginUser'

export default {
  Mutation: {
    loginUser,
  },
  Query: {},
}
