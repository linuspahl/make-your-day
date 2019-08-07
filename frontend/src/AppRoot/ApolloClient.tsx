// Apollo client setup, will handle all api data fetching.
// It's the counterpart for the backend apollo server.

// We need to define a fetch polyfill to test the apollo client correctly
import 'cross-fetch/polyfill'
// config
import config from 'config'
// libraries
import ApolloClient from 'apollo-boost'
// interfaces
import { NotificationCreate } from 'types/types'

function getApiUrl(): string {
  let url = config.apiHost
  if (config.apiPort) {
    url += `:${config.apiPort}`
  }
  // Append graphql route
  return `${url}/graphql`
}

export default (
  clearLocalStorage: () => void,
  createNotificationBanner: (notification: NotificationCreate) => void
): ApolloClient<object> =>
  new ApolloClient({
    uri: getApiUrl,
    request: async (operation): Promise<void> => {
      const token = localStorage.getItem('authToken') || null
      operation.setContext({
        headers: {
          authorization: token,
        },
      })
    },
    onError: (error): void => {
      // When an auth error occures, e.g. when session expires,
      // we want to logout user
      if (error && error.graphQLErrors) {
        const authErrors = error.graphQLErrors.filter(
          (error): boolean => error.extensions.code === 'UNAUTHENTICATED'
        )
        if (authErrors && authErrors.length !== 0) {
          // First we clear the localStorage / userSession
          clearLocalStorage()
          // Then we notify the user
          createNotificationBanner({
            type: 'error',
            message: 'Die Sitzung ist nicht mehr gültig',
          })
        }
      }
    },
  })
