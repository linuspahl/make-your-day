// libraries
import React from 'react'
import { ThemeProvider } from 'styled-components'

// theme
import colorTheme from '../../config/theme'

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={colorTheme}>
        <div>Hello world!</div>
      </ThemeProvider>
    )
  }
}
