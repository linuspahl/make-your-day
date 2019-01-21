import config from '../../config/config'

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
