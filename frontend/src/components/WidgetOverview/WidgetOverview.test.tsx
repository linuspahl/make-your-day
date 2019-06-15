// libraries
import * as React from 'react'
// components
import WidgetOverview from './WidgetOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import {
  widget,
  getWidgetsOverviewError,
  getWidgetsOverviewSuccess,
} from 'store/widget/fixtures'

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

  test('show info, when widget fetching fails', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <WidgetOverview rootPath="/widgets" />,
      { mocks: [getWidgetsOverviewError] }
    )
    // Wait for the Query component
    await wait()
    expect(
      getByText('Widgets konnten nicht geladen werden')
    ).toBeInTheDocument()
  })

  test('show loading spinner, while fetching widgets', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <WidgetOverview rootPath="/widgets" />
    )
    // without `await wait()` the Query component will be in the loading state
    expect(getByTestId('CenteredSpinner')).toBeInTheDocument()
  })

  test('show info, when there are no existing widgets', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(
      <WidgetOverview rootPath="/widgets" />,
      {
        mocks: [
          {
            ...getWidgetsOverviewSuccess,
            result: { data: { getWidgets: [] } },
          },
        ],
      }
    )
    await wait()

    expect(getByText('Kein Eintrag vorhanden')).toBeInTheDocument()
  })
})
