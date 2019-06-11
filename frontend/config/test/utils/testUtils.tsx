// The file for all test utility functions.
// We are combining our custom function with the @testing-library/react methods
// to have one central file the test utility functions.

// libraries
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  wait,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import colorTheme from 'theme'

interface WrappedComponent extends RenderResult {
  history: MemoryHistory
}

// Custom render utils
function renderWithAppRoot(
  component: JSX.Element,
  {
    route = '/',
    themeProps = {},
    mocks = [],
    ...renderOptions
  }: {
    route?: string
    themeProps?: { [key: string]: boolean }
    mocks?: readonly MockedResponse[]
  } = {}
): WrappedComponent {
  const history = createMemoryHistory({ initialEntries: [route] })
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider theme={colorTheme(themeProps)}>
        <Router history={history}>{component}</Router>
      </ThemeProvider>
    </MockedProvider>,
    renderOptions
  )

  return { ...utils, history }
}

// Custom fireEvent option (because we use them so many times)
const leftClickOption = { button: 0 }

export { render, cleanup, renderWithAppRoot, fireEvent, leftClickOption, wait }
