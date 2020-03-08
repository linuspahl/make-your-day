// libraries
import React from 'react'
// utils
import {
  renderWithAppRoot,
  cleanup,
  wait,
  mockWindow,
  mockDocument,
} from 'testUtils'
// components
import DashboardWidgets from 'components/DashboardWidgets/DashboardWidgets'
// fixtures
import { widget } from 'store/widget/fixtures'
import { evaluation } from 'store/evaluation/fixtures'
import { getRecordsSuccess } from 'store/record/fixtures'

describe('DashboardWidgets should', (): void => {
  const propFixtures = {
    loading: false,
    widgets: [widget],
  }
  mockDocument()
  mockWindow()
  afterEach(cleanup)

  test('render widgets', (): void => {
    const { getByText } = renderWithAppRoot(
      <DashboardWidgets {...propFixtures} />
    )
    expect(getByText(widget.title)).toBeInTheDocument()
  })

  test('show loading spinner', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <DashboardWidgets {...propFixtures} loading={true} />
    )
    expect(getByTestId('DashboardWidgetsPlaceholder')).toBeInTheDocument()
  })

  test('render Timeline widget', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(
      <DashboardWidgets
        {...propFixtures}
        widgets={[{ ...widget, type: 'timeline' }]}
      />,
      { mocks: [getRecordsSuccess] }
    )
    await wait()
    expect(getByText('We')).toBeInTheDocument()
  })

  test('render Evaluation widget', async (): Promise<void> => {
    const { container } = renderWithAppRoot(
      <DashboardWidgets
        {...propFixtures}
        widgets={[{ ...widget, type: 'evaluation', evaluation }]}
      />
    )
    // Wait for chart library to finish render
    await wait()
    expect(container.getElementsByClassName('ct-chart-line')).toHaveLength(1)
  })
})
