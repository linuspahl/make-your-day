// Login function, will create an auth token on success
import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

import config from '../../../config/config'

export default (models, token) => {
  const { User, UserSession } = models

  try {
    !jwt.verify(token, config.apiSecret)
  } catch {
    throw new AuthenticationError('Your session expired. Sign in again.')
  }

  return UserSession.findOne({
    where: { token },
    include: [{ model: User }],
  })
    .then(userSession => {
      if (
        !userSession ||
        !userSession.dataValues ||
        !userSession.dataValues.user
      ) {
        throw new AuthenticationError()
      }
      return userSession.dataValues.user
    })
    .catch(() => {
      throw new AuthenticationError('Keine Sitzung gefunden')
    })
}
