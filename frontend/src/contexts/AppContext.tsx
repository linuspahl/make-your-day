// libraries
import React from 'react'
// interfaces
import { NotificationCreate, LocalStorageCreate } from 'types/types'
import { UserSession } from 'store/userSession/type'

interface AppContextType {
  createNotificationBanner?: (notification: NotificationCreate) => void
  clearLocalStorage?: () => void
  updateLocalStorage?: (nextStore: LocalStorageCreate) => void
  userSession?: UserSession
  userSettings?: {
    nightMode: boolean
    leftHandMode: boolean
    showAppBgImage: boolean
  }
}

const initialValue: AppContextType = {}

const AppContext = React.createContext(initialValue)

export default AppContext
