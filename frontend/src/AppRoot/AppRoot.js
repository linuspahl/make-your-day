// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './ApolloClient'
import {
  getLocalString,
  getLocalBoolean,
  getLocalNumber,
  updateLocalStorage,
} from 'utils/utils'

// theme
import colorTheme from '../../config/theme'

// components
import Routes from './Routes/Routes'

export default class AppRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      nightMode: getLocalBoolean('nightMode'),
      authToken: getLocalString('authToken'),
      leftHandMode: getLocalBoolean('leftHandMode'),
      showAppBgImage: getLocalBoolean('showAppBgImage'),
      userId: getLocalNumber('userId'),
      userRole: getLocalString('userRole'),
    }

    this.updateLocalStorage = newStore => {
      updateLocalStorage(newStore, this.setState.bind(this))
    }
  }
  render() {
    const { userId, authToken } = this.state
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme}>
          <Routes
            isUserLoggedIn={userId && authToken}
            updateLocalStorage={this.updateLocalStorage}
          />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
