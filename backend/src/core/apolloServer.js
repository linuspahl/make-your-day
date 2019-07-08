// Apollo server setup

import { ApolloServer } from 'apollo-server-express'
import typeDefs from '../types'
import resolvers from '../resolvers/resolvers'
import loaders from '../resolvers/loaders'
import models from '../models'
import config from '../../config/config'

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: async req => {
    console.log('NEW REQUEST!!!!!')
    const {
      req: {
        headers: { authorization },
      },
    } = req
    const token = authorization !== 'null' ? authorization : null
    const currentUser = token ? await models.User.findByToken(token) : null
    return {
      models,
      currentUser,
      loaders: loaders(models, currentUser),
    }
  },
  playground: {
    endpoint: config.apiEndpoint,
    settings: {
      'editor.theme': 'dark',
    },
  },
})
