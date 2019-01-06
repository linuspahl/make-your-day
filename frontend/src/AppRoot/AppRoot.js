// App root file
// Containes everything the base app needs,
// like the theme and apollo provider and the routes

// libraries
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './ApolloClient'

// theme
import colorTheme from '../../config/theme'

// components
import Routes from './Routes/Routes'

export default class AppRoot extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={colorTheme}>
          <Routes />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
