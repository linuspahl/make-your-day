// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import React, { Fragment } from 'react'
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
import NotificationBanner from './NotificationBanner/NotificationBanner'

export default class AppRoot extends React.Component {
  constructor(props) {
    super(props)

    this.notificationBanner = React.createRef()

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

    this.createNotificationBanner = notification =>
      this.notificationBanner.current.addNotification(notification)
  }
  render() {
    const { userId, authToken } = this.state

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme}>
          <Fragment>
            <NotificationBanner ref={this.notificationBanner} />
            <Routes
              isUserLoggedIn={userId && authToken}
              updateLocalStorage={this.updateLocalStorage}
              clearLocalStorage={this.clearLocalStorage}
              createNotificationBanner={this.createNotificationBanner}
            />
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
