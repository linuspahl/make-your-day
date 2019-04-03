// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import createApolloClient from './ApolloClient'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { getLocalStorage, updateLocalStorage } from 'utils/utils'
import { ThemeProvider } from 'styled-components'
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

    // The AppRoot state is a representation of localStorage.
    // We are using the getLocalStorage utility function to
    // format the localStorage values (only stores strings),
    // before storing them in the state
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

    // Since the localStorage only can store plain stings we can't directly store the
    // UserSession object we receive on login.
    // We could stringify the whole object, but prefer to just store the values
    // and recreate the UserSession object
    const userSession: UserSession = {
      userId,
      expiresAt,
      token: authToken,
      id: userSessionId,
    }

    // On login we also receive the userSettings.
    // They are needed for the theme, e.g. when a user is using the nightMode,
    // the theme will return different colors.
    // And because we already fetched them, we are using them on the settings page
    // to determine if an options is selected.
    const userSettings = {
      nightMode,
      leftHandMode,
      showAppBgImage,
    }

    // Finally we are creating the apollo client, needed to comunicate
    // with our backend apollo server.
    const apolloClient = createApolloClient(
      this.clearLocalStorage,
      this.createNotificationBanner
    )

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme(userSettings)}>
          <React.Fragment>
            {/*
                We are using the NotificationBanner above all routes,
                this way the notifications won't unmount on route changes
              */}
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

  // updateLocalStorage - Needed to update the localStorage,
  // e.g. when user logs in / out
  private updateLocalStorage(newStore: LocalStorageCreate): void {
    updateLocalStorage(newStore, this.setState.bind(this))
  }

  // clearLocalStorage - Will clear the localStore.
  // Since the AppRoot state is a representation of the localStorage,
  // we need to clear it as well.
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

  // createNotificationBanner - Will be used in the children components.
  // Uses the this.notificationBanner reference to create a new banner
  private createNotificationBanner(notification: NotificationCreate): void {
    this.notificationBanner.current.addNotification(notification)
  }
}
