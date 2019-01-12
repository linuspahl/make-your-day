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
export const getLocalBoolean = name => {
  return JSON.parse(localStorage.getItem(name)) || false
}

export const getLocalString = name => {
  return localStorage.getItem(name) || null
}

export const getLocalNumber = name => {
  return parseInt(localStorage.getItem(name), 10) || null
}

export const updateLocalStorage = (newStore, setState) => {
  // Create a clean store without undefined values
  const updatedStore = {}
  Object.keys(newStore).forEach(key => {
    const value = newStore[key]
    // We prefere to use SCREAMING_SNAKE_CASE notation for local store DataTransferItemList, but in this case it is easier to use the camelCase notation
    // This way we don't need to map the different notations
    if (Boolean(value)) {
      // If value is defined update localstorage and app state
      updatedStore[key] = value
      localStorage.setItem(key, value)
    }
  })
  setState(updatedStore)
}
