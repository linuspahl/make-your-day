// Theme configuration file
// Not only for colors, more a config file for all kind of theme settings

import { merge } from '../src/utils/utils'


const defaultTheme = {
  // Primary  color, mostly used by buttons
  primary: '#a5d7ff',
  primaryActive: '#8cccff',
  // Secondary color, mostly used by buttons
  secondary: '#e2e2e2',
  secondaryActive: '#cccccc',
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
  category: {
    navy: '#001f3f',
    blue: '#0074D9',
    aqua: '#7FDBFF',
    teal: '#39CCCC',
    olive: '#3D9970',
    green: '#2ECC40',
    lime: '#01FF70',
    yellow: '#FFDC00',
    orange: '#FF851B',
    red: '#FF4136',
    maroon: '#85144b',
    fuchsia: '#F012BE',
    purple: '#B10DC9',
    black: '#111111',
    gray: '#AAAAAA',
    silver: '#DDDDDD',
  },
  // category icon color specific text colors
  categoryText: {
    navy: '#80bfff',
    blue: '#b3dbff',
    aqua: '#004966',
    teal: '#000',
    olive: '#163728',
    green: '#0e3e14',
    lime: '#00662c',
    yellow: '#665800',
    orange: '#663000',
    red: '#800600',
    maroon: '#eb7ab1',
    fuchsia: '#65064f',
    purple: '#efa9f9',
    black: '#ddd',
    gray: '#000',
    silver: '#000',
  },
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
  let colors = defaultTheme;
  if (userSettings.nightMode) {
    // if nightmode is active, we will just change some specific colors
    colors = merge(defaultTheme, nightModeTheme)
  }
  return {...colors, settings: {...userSettings}}
}