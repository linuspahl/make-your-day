// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import React, { useRef, useEffect, useState } from 'react'
import createApolloClient from './ApolloClient'
import { ApolloProvider } from 'react-apollo'
import { LocalStorageProvider } from 'utils/utils'
import { ThemeProvider } from 'styled-components'
// utils
import AppContext from 'contexts/AppContext'
// theme
import colorTheme from 'theme'
// components
import { AppWrapper } from './styles'
import Routes from './Routes/Routes'
import NotificationBanner from './NotificationBanner/NotificationBanner'
// interfaces
import {
  LocalStorage,
  NotificationCreate,
  AppContext as AppContextType,
  LocalStorageCreate,
} from 'types/types'
import { UserSession } from 'store/userSession/type'

const useBrowserStorage = (): [
  LocalStorage,
  (localStorage: LocalStorage) => void
] => {
  const [browserStorage, setBrowserStorage] = useState<LocalStorage>({})
  useEffect((): void => {
    const localStorage = LocalStorageProvider.get([
      'authToken',
      'expiresAt',
      'leftHandMode',
      'nightMode',
      'showAppBgImage',
      'userId',
      'userSessionId',
    ])

    setBrowserStorage(localStorage)
  }, [])
  return [browserStorage, setBrowserStorage]
}

const AppRoot = (): JSX.Element => {
  const notificationBanner = useRef<NotificationBanner>(null)
  const [browserStorage, setBrowserStorage] = useBrowserStorage()
  const clearLocalStorage = (): void =>
    LocalStorageProvider.clear(setBrowserStorage)
  const {
    authToken,
    expiresAt,
    leftHandMode,
    nightMode,
    showAppBgImage,
    userId,
    userSessionId,
  } = browserStorage
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
  const createNotificationBanner = (notification: NotificationCreate): void => {
    notificationBanner.current.addNotification(notification)
  }
  const updateLocalStorage = (nextStore: LocalStorageCreate): void =>
    LocalStorageProvider.update(nextStore, setBrowserStorage)
  const apolloClient = createApolloClient(
    clearLocalStorage,
    createNotificationBanner
  )
  const appContext: AppContextType = {
    createNotificationBanner,
    clearLocalStorage,
    updateLocalStorage,
    userSession,
    userSettings,
  }

  return (
    <AppContext.Provider value={appContext}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme(userSettings)}>
          <AppWrapper>
            {/*
              We are using the NotificationBanner above all routes,
              this way the notifications won't unmount on route changes
            */}
            <NotificationBanner ref={notificationBanner} />
            <Routes
              userSession={userSession}
              updateLocalStorage={updateLocalStorage}
              userSettings={userSettings}
            />
          </AppWrapper>
        </ThemeProvider>
      </ApolloProvider>
    </AppContext.Provider>
  )
}

export default AppRoot
