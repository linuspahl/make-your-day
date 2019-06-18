// libraries
import * as React from 'react'
// components
import TimelineWidgetDay from './TimelineWidgetDay'
// fixtures
import { category } from 'store/category/fixtures'
import {
  renderWithAppRoot,
  cleanup,
  fireEvent,
  leftClickOption,
  wait,
} from 'testUtils'

describe('TimelineWidgetDay should', (): void => {
  const propFixtures = {
    categories: [{ ...category, recordAmountSum: 100 }],
    date: '2012-12-12',
  }
  afterEach(cleanup)

  test('open timeline day overview on click', (): void => {
    const { getByText } = renderWithAppRoot(
      <TimelineWidgetDay {...propFixtures} />
    )
    fireEvent.click(getByText('We'), leftClickOption)
    // expect(location.pathname).toBe('/timeline/2012-12-12')
    // TODO: test history.push stub
  })

  test('render provided day', (): void => {
    const { getByText } = renderWithAppRoot(
      <TimelineWidgetDay {...propFixtures} />
    )
    expect(getByText('We')).toBeInTheDocument()
  })

  test('render provided categories', (): void => {
    const { getByText } = renderWithAppRoot(
      <TimelineWidgetDay {...propFixtures} />
    )
    expect(getByText(`100${category.unit}`)).toBeInTheDocument()
  })

  test('render without provided categories', (): void => {
    const { getByText } = renderWithAppRoot(
      <TimelineWidgetDay date={'2012-12-12'} categories={undefined} />
    )
    expect(getByText('We')).toBeInTheDocument()
  })
})
