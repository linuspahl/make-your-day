// Apollo client setup

// We need to define a fetch polyfill to test the apollo client correctly
import 'cross-fetch/polyfill'

import ApolloClient from 'apollo-boost'
import config from '../../config/config'

export default (clearLocalStorage, createNotificationBanner) =>
  new ApolloClient({
    uri: `${config.apiHost}:${config.apiPort}/graphql`,
    request: async operation => {
      const token = localStorage.getItem('authToken') || null
      operation.setContext({
        headers: {
          authorization: token,
        },
      })
    },
    onError: error => {
      // On auth error, e.g. when session expires, logout user
      if (error && error.graphQLErrors) {
        const authErrors = error.graphQLErrors.filter(
          error => error.extensions.code === 'UNAUTHENTICATED'
        )
        if (authErrors && authErrors.length !== 0) {
          createNotificationBanner({
            type: 'error',
            message: 'Die Sitzung ist nicht mehr gültig',
          })
          clearLocalStorage()
        }
      }
    },
  })
