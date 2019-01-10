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
      authToken: getLocalString('authToken'),
      userId: getLocalNumber('userId'),
    }

    this.updateLocalStorage = newStore => {
      updateLocalStorage(newStore, this.setState.bind(this))
    }

    this.clearLocalStorage = () => {
      localStorage.clear()
      this.setState({ authToken: null, userId: null })
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
            clearLocalStorage={this.clearLocalStorage}
          />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
