// Utility file for all multiplate needed helper functions

import config from '../../config/config'
// libraries
import { ApolloError } from 'apollo-boost'
// interfaces
import { LocalStorageCreate, InputEvent, LocalStorage } from 'types/types'

// This function will merge two objects and overwrite
// doublicated values with the value of the target object
export const merge = (
  sourceObj: { [key: string]: object },
  targetObj: { [key: string]: object }
): object => {
  // we need to create a clone of the source object
  // to avoid any manipualtion of the source object
  const sourceObjClone = Object.assign({}, sourceObj)

  for (const objKey in targetObj) {
    sourceObjClone[objKey] = targetObj[objKey]
  }

  return sourceObjClone
}

// This function will convert a unix date to a YYYY-MM-DD string
export const formatUnixDate = (unixDate: string): Date => {
  // Expects unix date string like '1549395636726'
  const unixDateInt = parseInt(unixDate, 10)
  return new Date(unixDateInt)
}

// This function will add a yero for every number less than ten
// It's needed for the date string and will always return a string
const formatDatePartial = (dateNumber: number): string => {
  if (dateNumber < 10) {
    return `0${dateNumber}`
  }

  return `${dateNumber}`
}

export const getDateString = (dateParam: Date): string => {
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
): void => {
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
export const logError = (error: ApolloError | string): void => {
  // Only case in the app where we use the console.log function
  // eslint-disable-next-line no-console
  if (config.isDevEnv) console.log(error)
}

// Extract id param from router history object
export const extractIdFromUrl = (
  match: { params: { [key: string]: string } },
  attribute: string = 'id'
): number => {
  const { params } = match
  const id = params[attribute]

  return id ? parseInt(id, 10) : null
}

export const generateUrlParams = (params: {
  [key: string]: string
}): string => {
  let paramsString = ''
  if (params) {
    Object.keys(params).forEach(
      (key): void => {
        const value = params[key]
        let paramsSeparater = '&'
        if (!paramsString) {
          paramsSeparater = `?`
        }
        paramsString = paramsString.concat(`${paramsSeparater}${key}=${value}`)
      }
    )
  }
  return paramsString
}

export const parseQueryParams = (queryString: string): object => {
  const queryParams: { [key: string]: string } = {}

  if (queryString) {
    const queryArray = queryString.split('?')[1].split('&')

    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split('=')
      queryParams[key] = val
    }
  }

  return queryParams
}

// Utility localstorage functions

// format function for all existing local storage values
const formatAppStateValue = (
  key: string,
  value: string
): string | number | boolean => {
  switch (key) {
    // Numbers
    case 'userId':
    case 'userSessionId':
      return parseInt(value, 10)
    // Booleans
    case 'nightMode':
    case 'leftHandMode':
    case 'showAppBgImage':
      return value ? JSON.parse(value) : false
    default:
      return value || null
  }
}

// Update local storage needed when setting e.g. user settings like the darkmode
export const updateLocalStorage = (
  newStore: LocalStorageCreate,
  setState: (state: LocalStorage) => void
): void => {
  // We prefere to use SCREAMING_SNAKE_CASE notation for local store DataTransferItemList, but in this case it is easier to use the camelCase notation
  // This way we don't need to map the different notations

  // Create a clean app store without undefined values
  const updatedStore: { [key: string]: string | number | boolean } = {}
  Object.keys(newStore).forEach(
    (key: string): void => {
      // format to int / boolean and update specified  app state
      const value = formatAppStateValue(key, newStore[key])
      updatedStore[key] = value
      // format value to string and update LocalStorage
      localStorage.setItem(key, String(value))
    }
  )
  setState(updatedStore)
}

// get localstorage values by provided keys
export const getLocalStorage = (
  stateKeys: string[] = []
): { [key: string]: string } =>
  stateKeys.reduce(
    (
      result: { [key: string]: string | number | boolean },
      key: string
    ): object => {
      const value = localStorage.getItem(key)
      result[key] = formatAppStateValue(key, value)
      return result
    },
    {}
  )
