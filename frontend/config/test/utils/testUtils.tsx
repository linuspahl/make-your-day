// The file for all test utility functions.
// We are combining our custom function with the @testing-library/react methods
// to have one central file the test utility functions.

// libraries
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import {
  render,
  cleanup,
  RenderResult,
  fireEvent,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import colorTheme from 'theme'

interface WrappedComponent extends RenderResult {
  history: MemoryHistory<any>
}

function renderWithAppRoot(
  component: JSX.Element,
  { route = '/', ...renderOptions } = {}
): WrappedComponent {
  const history = createMemoryHistory({ initialEntries: [route] })
  const utils = render(
    <ThemeProvider theme={colorTheme()}>
      <Router history={history}>{component}</Router>
    </ThemeProvider>,
    renderOptions
  )

  return { ...utils, history }
}

export { render, cleanup, renderWithAppRoot, fireEvent }
