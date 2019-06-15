// libraries
import * as React from 'react'
// components
import CategoryIconOverview from './CategoryIconOverview'
import { renderWithAppRoot, wait } from 'testUtils'
// fixtures
import {
  getCategoriesIconError,
  getCategoriesIconSuccess,
} from 'store/category/fixtures'

describe('CategoryIconOverview should', (): void => {
  test('list fetched categories', async (): Promise<void> => {
    const { getAllByTestId } = renderWithAppRoot(<CategoryIconOverview />, {
      mocks: [getCategoriesIconSuccess],
    })
    // Wait for the Query component
    await wait()
    expect(getAllByTestId('Icon')).toHaveLength(1)
  })

  test('show info, when category fetching fails', async (): Promise<void> => {
    const { getByText } = renderWithAppRoot(<CategoryIconOverview />, {
      mocks: [getCategoriesIconError],
    })
    // Wait for the Query component
    await wait()
    expect(
      getByText('Kategorien konnten nicht geladen werden')
    ).toBeInTheDocument()
  })

  test('show loading spinner, while fetching categories', (): void => {
    const { getAllByTestId } = renderWithAppRoot(<CategoryIconOverview />)
    // without `await wait()` the Query component will be in the loading state
    expect(getAllByTestId('CategoryIconPlaceholder')).toHaveLength(3)
  })

  test('show info, when there are no existing categories', async (): Promise<
    void
  > => {
    const { getByText } = renderWithAppRoot(<CategoryIconOverview />, {
      mocks: [
        {
          ...getCategoriesIconSuccess,
          result: { data: { getCategories: [] } },
        },
      ],
    })
    await wait()
    expect(getByText('Noch keine Kategorie vorhanden')).toBeInTheDocument()
  })

  test('change flow direction, if context is horizontal-scroll', async (): Promise<
    void
  > => {
    const { container } = renderWithAppRoot(
      <CategoryIconOverview context="horizontal-scroll" />,
      {
        mocks: [getCategoriesIconSuccess],
      }
    )
    expect(container.firstChild).toHaveStyleRule('display', 'flex')
  })
})
