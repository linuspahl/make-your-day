// Utility file for all multiplate needed helper functions

import config from '../../config/config'
// interfaces
import { LocalStorageCreate, InputEvent, LocalStorage } from 'src/types/types'
import { ApolloError } from 'apollo-boost';

// Basic sort function
export const sortBy = (array: Array<any>, attribute: string, order: string = 'desc') => {
  return array.sort((a, b) => {
    if (a[attribute] < b[attribute]) return order === 'desc' ? -1 : 1
    if (a[attribute] > b[attribute]) return order === 'desc' ? 1 : -1
    return 0
  })
}

// This function will merge two objects and overwrite
// doublicated values with the value of the target object
export const merge = (sourceObj: any, targetObj: any) => {
  // we need to create a clone of the source object
  // to avoid any manipualtion of the source object
  const sourceObjClone = Object.assign({}, sourceObj)

  for (const objKey in targetObj) {
    sourceObjClone[objKey] = targetObj[objKey]
  }

  return sourceObjClone
}

// This function will convert a unix date to a YYYY-MM-DD string
export const formatUnixDate = (unixDate: string) => {
  // Expects unix date string like '1549395636726'
  const unixDateInt = parseInt(unixDate, 10)
  return new Date(unixDateInt)
}

// This function will add a yero for every number less than ten
// It's needed for the date string and will always return a string
const formatDatePartial = (dateNumber: number) => {
  if (dateNumber < 10) {
    return `0${dateNumber}`
  }

  return `${dateNumber}`
}

export const getDateString = (dateParam: Date) => {
  // Expects a JS date object
  // Returns a string with the format like 'YYYY-M-D'
  const date = new Date(dateParam)

  // Get number of the day and month
  const monthNr = date.getMonth() + 1
  const dayNr = date.getDate()

  // Convert day and month to string
  const month = formatDatePartial(monthNr)
  const day = formatDatePartial(dayNr)

  return `${date.getFullYear()}-${month}-${day}`
}

// Utility form function - will updade the form state on input change.
// Used in every input.
export const handleInputChange = (
  event: InputEvent,
  changeState: (state: object) => void
  ) => {

  const { target } = event
  const { name } = target
  const value = target.type === 'checkbox' ? target.checked : target.value

  changeState({
    [name]: value,
  })
}

// Central place for handling error logging
// This will log errors like e.g. failing requests
// So far only needed for development
export const logError = (error: ApolloError | string) => {
  // Only case in the app where we use the console.log function
  // eslint-disable-next-line no-console
  if (config.isDevEnv) console.log(error)
}

// Extract id param from router history object
export const extractIdFromUrl = (match: { params: any }, attribute: string = 'id') => {
  const { params } = match
  const id = params[attribute]

  return id ? parseInt(id, 10) : null
}

export const generateUrlParams = (params: any) => {
  let paramsString = ''
  if (params) {
    Object.keys(params).forEach(key => {
      const value = params[key]
      let paramsSeparater = '&'
      if (!paramsString) {
        paramsSeparater = `?`
      }
      paramsString = paramsString.concat(`${paramsSeparater}${key}=${value}`)
    })
  }
  return paramsString
}


// Utility localstorage functions
// Update local storage needed when setting e.g. user settings like the darkmode
export const updateLocalStorage = (
  newStore: LocalStorageCreate,
  setState: (state: LocalStorage) => void
) => {
  // We prefere to use SCREAMING_SNAKE_CASE notation for local store DataTransferItemList, but in this case it is easier to use the camelCase notation
  // This way we don't need to map the different notations

  // Create a clean store without undefined values
  const updatedStore: any = {}
  Object.keys(newStore).forEach((key: string) => {
    const value = formatAppStateValue(key, newStore[key])
    updatedStore[key] = value
    localStorage.setItem(key, value)
  })
  setState(updatedStore)
}

// get localstorage values by provided keys
export const getLocalStorage = (stateKeys: Array<string>) =>
  stateKeys.reduce((
    result: {[key: string]: string},
    key: string
  ) => {
    const value = localStorage.getItem(key)
    result[key] = formatAppStateValue(key, value)
    return result
  }, {})

// format function for all existing local storage values
const formatAppStateValue = (key: string, value: string ) => {
  switch (key) {
    // Numbers
    case 'userId':
    case 'userSessionId':
    // Booleans
    case 'nightMode':
    case 'leftHandMode':
    case 'showAppBgImage':
      return value ? JSON.parse(value) : false
    default:
      return value || null
  }
}
