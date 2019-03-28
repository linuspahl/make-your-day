export interface InputEvent {
  target: {
    checked?: boolean
    name: string
    type?: string
    value?: string | number
  }
}

export interface LocalStorage {
  [key: string]: string | boolean | Date | number
  authToken?: string
  expiresAt?: string
  leftHandMode?: boolean
  nightMode?: boolean
  showAppBgImage?: boolean
  userId?: number
  userSessionId?: number
}

export interface LocalStorageCreate {
  [key: string]: string
  authToken?: string
  expiresAt?: string
  leftHandMode?: string
  nightMode?: string
  showAppBgImage?: string
  userId?: string
  userSessionId?: string
}

export interface SelectOption {
  title: string
  value: number | string
}

export interface Notification {
  createdAt: Date
  message: string
  type: 'error' | 'success'
}

export interface NotificationCreate {
  message: Notification['message']
  type: Notification['type']
}

export interface Form {
  mode?: 'create'
}
