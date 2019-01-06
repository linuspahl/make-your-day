import ApolloClient from 'apollo-boost'
import config from '../../config/config'
import 'cross-fetch/polyfill'

export default new ApolloClient({
  uri: `${config.apiHost}:${config.apiPort}/graphql`,
})
