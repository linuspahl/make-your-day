import config from '../../config/config'

// Basic sort function
export const sortBy = (array, attribute, order = 'desc') => {
  return array.sort((obj1, obj2) =>
    order === 'desc'
      ? obj1[attribute] - obj2[attribute]
      : obj2[attribute] - obj1[attribute]
  )
}


// This function will merge two objects and overwrite
// doublicated values with the value of the target object
export const merge = (sourceObj, targetObj) => {
  // we need to create a clone of the source object
  // to avoid any manipualtion of the source object
  const sourceObjClone = Object.assign({}, sourceObj)

  for (const objKey in targetObj) {
    sourceObjClone[objKey] = targetObj[objKey]
  }

  return sourceObjClone
}

// This function will convert a unix date to a YYYY-MM-DD string
export const formatUnixDate = unixDate => {
  const unixDateInt = parseInt(unixDate, 10)
  const date = new Date(unixDateInt)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

export const getWeekDayNr = unixDate => {
  const unixDateInt = parseInt(unixDate, 10)
  const date = new Date(unixDateInt)
  return date.getDay()
}

// Utility form function - will updade the form state on input change.
// Used in every input.
export const handleInputChange = (event, setState) => {
  const { target } = event
  const { name } = target
  const value = target.type === 'checkbox' ? target.checked : target.value

  setState({
    [name]: value,
  })
}

// Default log function for the develop mode
// This will log errors like e.g. failing requests
export const logError = error => {
  if (config.isDevEnv) console.log(error)
}

// Extract id param from router history object
export const extractIdFromUrl = match => {
  const {
    params: { id },
  } = match
  return id ? parseInt(id, 10) : null
}

// Utility localstorage functions
// Update local storage needed when setting e.g. user settings like the darkmode
export const updateLocalStorage = (newStore, setState) => {
  // We prefere to use SCREAMING_SNAKE_CASE notation for local store DataTransferItemList, but in this case it is easier to use the camelCase notation
  // This way we don't need to map the different notations

  // Create a clean store without undefined values
  const updatedStore = {}
  Object.keys(newStore).forEach(key => {
    const value = formatAppStateValue(key, newStore[key])
    updatedStore[key] = value
    localStorage.setItem(key, value)
  })
  setState(updatedStore)
}

// get localstorage values by provided keys
export const getLocalStorage = stateKeys =>
  stateKeys.reduce((result, key) => {
    const value = localStorage.getItem(key)
    result[key] = formatAppStateValue(key, value)
    return result
  }, {})

// format function for all existing local storage values
const formatAppStateValue = (key, value) => {
  switch (key) {
    // Nubers
    case 'userId':
      return value ? parseInt(value, 10) : null
    // Booleans
    case 'nightMode':
    case 'leftHandMode':
    case 'showAppBgImage':
      return value ? JSON.parse(value) : false
    default:
      return value || null
  }
}
