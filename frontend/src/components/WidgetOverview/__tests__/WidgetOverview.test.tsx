// libraries
import React from 'react'
// utils
import { renderWithAppRoot, wait } from 'testUtils'
// components
import WidgetOverview from 'components/WidgetOverview/WidgetOverview'
// fixtures
import { widget, getWidgetsForListSuccess } from 'store/widget/fixtures'

describe('WidgetOverview should', (): void => {
  test('list fetched widgets', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <WidgetOverview rootPath="/widgets" />,
      { mocks: [getWidgetsForListSuccess] }
    )
    // Wait for the Query component
    await wait()
    expect(getByText(widget.title)).toBeInTheDocument()
  })
})
