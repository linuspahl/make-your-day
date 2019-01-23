// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import React, { Fragment } from 'react'
import apolloClient from './ApolloClient'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { getLocalStorage, updateLocalStorage } from 'utils/utils'

// theme
import colorTheme from '../../config/theme'

// components
import Routes from './Routes/Routes'
import NotificationBanner from './NotificationBanner/NotificationBanner'

export default class AppRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = getLocalStorage([
      'authToken',
      'userId',
      'nightMode',
      'leftHandMode',
      'showAppBgImage',
    ])

    this.notificationBanner = React.createRef()

    this.updateLocalStorage = this.updateLocalStorage.bind(this)
    this.clearLocalStorage = this.clearLocalStorage.bind(this)
    this.createNotificationBanner = this.createNotificationBanner.bind(this)
  }

  render() {
    const {
      userId,
      authToken,
      nightMode,
      leftHandMode,
      showAppBgImage,
    } = this.state

    const userSettings = {
      nightMode,
      leftHandMode,
      showAppBgImage,
    }

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
              userSettings={userSettings}
            />
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    )
  }

  updateLocalStorage(newStore) {
    updateLocalStorage(newStore, this.setState.bind(this))
  }

  clearLocalStorage() {
    localStorage.clear()
    this.setState({
      authToken: null,
      userId: null,
      nightMode: false,
      leftHandMode: false,
      showAppBgImage: false,
    })
  }

  createNotificationBanner(notification) {
    this.notificationBanner.current.addNotification(notification)
  }
}
