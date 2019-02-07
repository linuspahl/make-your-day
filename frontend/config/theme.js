// Theme configuration file
// Not only for colors, more a config file for all kind of theme settings

import { merge } from '../src/utils/utils'
import { categoryTextColors, categoryColors } from './params'

const defaultTheme = {
  // Primary  color, mostly used by buttons
  primary: '#a5d7ff',
  primaryActive: '#8cccff',
  // Secondary color, mostly used by buttons
  secondary: '#e2e2e2',
  secondaryActive: '#cccccc',
  // Delete
  delete: '#ff6060',
  // Default app bg
  appBg: '#e6eeff',
  // Font setting
  text: '#545454',
  // Other
  border: '#ccc',
  contentBoxBg: '#fff',
  white: '#fff',
  active: 'rgba(0, 0, 0, 0.1)',

  // Available category icon colors
  category: categoryColors,
  // category icon color specific text colors
  categoryText: categoryTextColors,
}

// set of colors which will be used for the night mode
const nightModeTheme = {
  primary: '#525252',
  primaryActive: '#313131',
  secondary: '#8e8e8e',
  secondaryActive: '#585858',
  appBg: '#030303',
  contentBoxBg: '#1a1a1b',

  text: '#fff',
  border: '#545454',
}

export default userSettings => {
  let colors = defaultTheme
  if (userSettings.nightMode) {
    // if nightmode is active, we will just change some specific colors
    colors = merge(defaultTheme, nightModeTheme)
  }
  return { ...colors, settings: { ...userSettings } }
}
