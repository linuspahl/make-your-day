// libraries
import { DocumentNode } from 'graphql'

// App types
export interface Theme {
  primary: string
  primaryActive: string
  secondary: string
  secondaryActive: string
  delete: string
  appBg: string
  text: string
  border: string
  boxShadow: string
  contentBoxBg: string
  white: string
  active: string
  timelineDay: string

  category: CategoryColors
  categoryText: CategoryColors
  settings: { [key: string]: boolean }
  mediaQuery: { tablet: string }
  layerIndex: LayerIndexes
  heights: AppHeights
  fontSizes: { mobile: AppFontSizes; tablet: AppFontSizes }
  padding: number
}

interface AppFontSizes {
  normal: number
  big: number
  large: number
}

export interface CategoryColors {
  [key: string]: string
  navy: string
  blue: string
  aqua: string
  teal: string
  olive: string
  green: string
  lime: string
  yellow: string
  orange: string
  red: string
  maroon: string
  fuchsia: string
  purple: string
  black: string
  gray: string
  silver: string
}

interface LayerIndexes {
  protrudeContent: number
  modal: number
  modalContent: number
  navigation: number
  notificationBanner: number
}

interface AppHeights {
  bottomMenu: number
}

export interface LocalStorage {
  [key: string]: string | boolean | Date | number
  authToken?: string
  expiresAt?: number
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

export interface NavigationState {
  open: boolean
  animateOnClose: boolean
}

// Form types
export interface InputEvent {
  target: {
    checked?: boolean
    name: string
    type?: string
    value?: string | number
  }
}

export interface SelectOption {
  title: string
  value: number | string
}

export interface Notification {
  createdAt: Date
  message: string
  type?: 'error' | 'success'
}

export interface NotificationCreate {
  message: Notification['message']
  type?: Notification['type']
}

export interface Form {
  mode?: 'create' | 'edit'
}

// Webpack
type WebpackPresets = 'analyze'
type WebpackModes = 'production' | 'development'

export interface WebpackConfigParams {
  mode: WebpackModes
  presets: WebpackPresets[]
}

// Tests
export interface ApiStub {
  request: { query: DocumentNode; variables?: object }
  result?: { data: { [queryName: string]: object } }
  error?: Error
}
