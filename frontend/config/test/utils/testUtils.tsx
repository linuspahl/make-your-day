// The file for all test utility functions.
// We are combining our custom function with the @testing-library/react methods
// to have one central file the test utility functions.

// libraries
import React from 'react'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import { ThemeProvider } from 'styled-components'
import {
  cleanup,
  fireEvent,
  Matcher,
  render,
  RenderResult,
  SelectorMatcherOptions,
  wait,
} from '@testing-library/react'
// utils
import colorTheme from 'theme'
import AppContext from 'contexts/AppContext'
// interfaces
import { ApiStub, AppContext as AppContextType } from 'types/types'

interface WrappedComponent extends RenderResult {
  history: MemoryHistory
}

// Custom render utils
function renderWithApolloProvier(
  component: JSX.Element,
  {
    mocks = [],
    ...renderOptions
  }: {
    mocks?: readonly MockedResponse[]
  } = {}
): RenderResult {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {component}
    </MockedProvider>,
    renderOptions
  )
}

function renderWithRoute(
  component: JSX.Element,
  mockWrappingRoute: boolean,
  routePath: string
): JSX.Element {
  if (mockWrappingRoute) {
    return (
      <Route exact path={routePath} render={(): JSX.Element => component} />
    )
  }
  return component
}

function renderWithAppRoot(
  component: JSX.Element,
  {
    context = undefined,
    route = '/',
    themeProps = {},
    mocks = [],
    mockWrappingRoute = false,
    routePath = null,
    ...renderOptions
  }: {
    context?: {
      createNotificationBanner?: AppContextType['createNotificationBanner']
      clearLocalStorage?: AppContextType['clearLocalStorage']
      updateLocalStorage?: AppContextType['updateLocalStorage']
      userSession?: AppContextType['userSession']
      userSettings?: AppContextType['userSettings']
    }
    // Is your component using a <Route> component and you want to
    // test something inside this route?
    // use the route prop with e.g. `/widgets/create`
    route?: string
    // Is your component no useing a Route, but withRouter?
    // use routePath (e.g. `/widgets/edit/:id`)
    // in combination with route (e.g. `/widgets/edit/1`)
    routePath?: string
    themeProps?: { [key: string]: boolean }
    mockWrappingRoute?: boolean
    mocks?: readonly MockedResponse[]
  } = {}
): WrappedComponent {
  const appContext = {
    createNotificationBanner: (): void => {},
    clearLocalStorage: (): void => {},
    userSession: {
      expiresAt: 1234,
      id: 'session-id',
      token: 'auth-token',
      userId: 'user-id',
    },
    userSettings: {
      nightMode: false,
      leftHandMode: false,
      showAppBgImage: false,
    },
    ...context,
  }
  const history = createMemoryHistory({ initialEntries: [route] })
  const utils = renderWithApolloProvier(
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={colorTheme(themeProps)}>
        <Router history={history}>
          {renderWithRoute(component, mockWrappingRoute, routePath)}
        </Router>
      </ThemeProvider>
    </AppContext.Provider>,
    { ...renderOptions, mocks }
  )

  return { ...utils, history }
}

// Custom mock functions
const mockWindow = (): void => {
  window.matchMedia = jest.fn().mockImplementation((query: string): object => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
  window.getSelection = jest.fn().mockImplementation((): {
    removeAllRanges: () => void
    addSelection: () => void
  } => {
    return {
      removeAllRanges: (): void => {},
      addSelection: (): void => {},
    }
  })
}

const mockDocument = (): void => {
  document.execCommand = (): boolean => true
}

// Custom fireEvent option (because we use them so many times)
const leftClickOption = { button: 0 }

const adjustApiStub = (
  apiStub: ApiStub,
  options: {
    variables?: object
    result?: object
  } = {}
): ApiStub => {
  let adjustedStub = Object.assign({}, apiStub)
  if (options.variables) {
    adjustedStub = {
      ...adjustedStub,
      request: { ...adjustedStub.request, variables: options.variables },
    }
  }

  if (options.result) {
    const queryName = Object.keys(adjustedStub.result.data)[0] // e.g getWidget
    adjustedStub = {
      ...adjustedStub,
      result: {
        ...adjustedStub.result,
        data: { [queryName]: options.result },
      },
    }
  }

  return adjustedStub
}

export {
  adjustApiStub,
  cleanup,
  fireEvent,
  leftClickOption,
  Matcher,
  mockDocument,
  mockWindow,
  render,
  renderWithApolloProvier,
  renderWithAppRoot,
  SelectorMatcherOptions,
  wait,
}
