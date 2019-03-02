import { ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { currentUser }) =>
  currentUser ? skip : new ForbiddenError('Not authenticated as user.')
