// Apollo server setup

import { ApolloServer } from 'apollo-server-express'
import typeDefs from '../types'
import resolvers from '../resolvers/resolvers'
import models from '../models'
import config from '../../config/config'

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: async req => {
    const {
      req: {
        headers: { authorization },
      },
    } = req
    const token = authorization !== 'null' ? authorization : null
    return {
      models,
      currentUser: token ? await models.User.findByToken(token) : null,
    }
  },
  playground: {
    endpoint: config.apiEndpoint,
    settings: {
      'editor.theme': 'dark',
    },
  },
})
