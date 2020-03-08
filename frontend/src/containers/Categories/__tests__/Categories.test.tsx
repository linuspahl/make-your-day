// libraries
import React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Categories from 'containers/Categories/Categories'
// fixtures
import { category } from 'store/category/fixtures'
import { record } from 'store/record/fixtures'

describe('Categories should', (): void => {
  const propsFixture = {
    rootPath: '/categories',
  }
  afterEach(cleanup)

  test('render category overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: '/categories',
      }
    )
    expect(getByTestId('CategoryOverview')).toBeInTheDocument()
  })

  test('render category create route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: '/categories/create',
    })
    expect(getByText('Kategorie erstellen')).toBeInTheDocument()
  })

  test('render category edit route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: `/categories/edit/${category.id}`,
      }
    )
    expect(getByTestId('CategoryEdit')).toBeInTheDocument()
  })

  test('category record create route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: `/categories/${category.id}/records/create`,
      }
    )
    expect(getByTestId('RecordCreate')).toBeInTheDocument()
  })

  test('category record edit route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: `/categories/${category.id}/records/${record.id}/edit`,
      }
    )
    expect(getByTestId('RecordEdit')).toBeInTheDocument()
  })

  test('category subcategory overview route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: `/categories/${category.id}/subcategories`,
      }
    )
    expect(getByTestId('SubcategoryOverview')).toBeInTheDocument()
  })

  test('category subcategory create route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: `/categories/${category.id}/subcategories/create`,
      }
    )
    expect(getByTestId('SubcategoryCreate')).toBeInTheDocument()
  })

  test('category subcategory edit route', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <Categories {...propsFixture} />,
      {
        route: `/categories/${category.id}/subcategories/1/edit`,
      }
    )
    expect(getByTestId('SubcategoryEdit')).toBeInTheDocument()
  })
})
