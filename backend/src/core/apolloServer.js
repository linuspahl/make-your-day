// Apollo server setup

import { ApolloServer } from 'apollo-server-express'
import typeDefs from '../types'
import resolvers from '../resolvers/resolvers'
import models from '../models'
import config from '../../config/config'

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ models, authToken: req.req.headers.authorization }),
  playground: {
    endpoint: config.apiEndpoint,
    settings: {
      'editor.theme': 'dark',
    },
  },
})
