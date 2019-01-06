// libraries
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apolloClient'

// theme
import colorTheme from '../../config/theme'

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme}>
          <div>Hello world!</div>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
