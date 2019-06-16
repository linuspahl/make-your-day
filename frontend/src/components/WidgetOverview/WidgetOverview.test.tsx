// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import WidgetOverview from './WidgetOverview'
// fixtures
import { widget, getWidgetsOverviewSuccess } from 'store/widget/fixtures'

describe('WidgetOverview should', (): void => {
  test('list fetched widgets', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <WidgetOverview rootPath="/widgets" />,
      { mocks: [getWidgetsOverviewSuccess] }
    )
    // Wait for the Query component
    await wait()
    expect(getByText(widget.title)).toBeInTheDocument()
  })
})
