// Apollo client setup

// We need to define a fetch polyfill to test the apollo client correctly
import 'cross-fetch/polyfill'

import ApolloClient from 'apollo-boost'
import config from '../../config/config'

export default new ApolloClient({
  uri: `${config.apiHost}:${config.apiPort}/graphql`,
  request: async operation => {
    const token = localStorage.getItem('authToken') || null
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
})
