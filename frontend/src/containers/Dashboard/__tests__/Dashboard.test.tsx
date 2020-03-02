// libraries
import React from 'react'
// utils
import { renderWithAppRoot, wait, cleanup, mockDocument } from 'testUtils'
// components
import Dashboard from 'containers/Dashboard/Dashboard'
// fixtures
import {
  getWidgetsWithEvaluationError,
  getWidgetsWithEvaluationSuccess,
  widget,
} from 'store/widget/fixtures'

describe('Dashboard should', (): void => {
  mockDocument()
  afterEach(cleanup)

  test('render dashboard and fetch widgets', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(<Dashboard />, {
      route: '/dashboard',
      mocks: [getWidgetsWithEvaluationSuccess],
    })
    await wait()
    expect(getByText(widget.value)).toBeInTheDocument()
  })

  test('render dashboard and show error message on widgets fetch error', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(<Dashboard />, {
      route: '/dashboard',
      mocks: [getWidgetsWithEvaluationError],
    })
    await wait()
    expect(
      getByText('Widgets konnten nicht geladen werden')
    ).toBeInTheDocument()
  })
})
