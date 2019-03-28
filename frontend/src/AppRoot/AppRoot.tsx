// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import * as React from 'react'
import createApolloClient from './ApolloClient'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { getLocalStorage, updateLocalStorage } from 'utils/utils'
// theme
import colorTheme from '../../config/theme'
// components
import Routes from './Routes/Routes'
import NotificationBanner from './NotificationBanner/NotificationBanner'
// interfaces
import {
  LocalStorage,
  LocalStorageCreate,
  NotificationCreate,
} from 'types/types'
import { UserSession } from 'store/userSession/type'

export default class AppRoot extends React.Component<{}, LocalStorage> {
  private notificationBanner: React.RefObject<NotificationBanner>

  public constructor(props: {}) {
    super(props)

    this.state = getLocalStorage([
      'authToken',
      'expiresAt',
      'leftHandMode',
      'nightMode',
      'showAppBgImage',
      'userId',
      'userSessionId',
    ])

    this.notificationBanner = React.createRef()

    this.updateLocalStorage = this.updateLocalStorage.bind(this)
    this.clearLocalStorage = this.clearLocalStorage.bind(this)
    this.createNotificationBanner = this.createNotificationBanner.bind(this)
  }

  public render(): React.ReactElement {
    const {
      authToken,
      expiresAt,
      leftHandMode,
      nightMode,
      showAppBgImage,
      userId,
      userSessionId,
    } = this.state

    const userSession: UserSession = {
      userId,
      expiresAt,
      token: authToken,
      id: userSessionId,
    }

    const userSettings = {
      nightMode,
      leftHandMode,
      showAppBgImage,
    }

    const apolloClient = createApolloClient(
      this.clearLocalStorage,
      this.createNotificationBanner
    )

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme(userSettings)}>
          <React.Fragment>
            <NotificationBanner ref={this.notificationBanner} />
            <Routes
              clearLocalStorage={this.clearLocalStorage}
              createNotificationBanner={this.createNotificationBanner}
              userSession={userSession}
              updateLocalStorage={this.updateLocalStorage}
              userSettings={userSettings}
            />
          </React.Fragment>
        </ThemeProvider>
      </ApolloProvider>
    )
  }

  private updateLocalStorage(newStore: LocalStorageCreate): void {
    updateLocalStorage(newStore, this.setState.bind(this))
  }

  private clearLocalStorage(): void {
    localStorage.clear()
    this.setState({
      authToken: null,
      expiresAt: null,
      leftHandMode: false,
      nightMode: false,
      showAppBgImage: false,
      userId: null,
    })
  }

  private createNotificationBanner(notification: NotificationCreate): void {
    this.notificationBanner.current.addNotification(notification)
  }
}
