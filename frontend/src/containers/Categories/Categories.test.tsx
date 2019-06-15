// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import Categories from './Categories'
// fixtures
import { category } from 'store/category/fixtures'
import { record } from 'store/record/fixtures'
import { userSession } from 'store/userSession/fixtures'

describe('Categories should', (): void => {
  const propsFixture = {
    createNotificationBanner: (): void => {},
    rootPath: '/categories',
    userSession: userSession,
  }
  afterEach(cleanup)

  test('render category overview route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: '/categories',
    })
    expect(getByText('Kategorien verwalten')).toBeInTheDocument()
  })

  test('render category create route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: '/categories/create',
    })
    expect(getByText('Kategorie erstellen')).toBeInTheDocument()
  })

  test('render category edit route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: `/categories/edit/${category.id}`,
    })
    expect(getByText('Kategorie bearbeiten')).toBeInTheDocument()
  })

  test('category record create route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: `/categories/${category.id}/records/create`,
    })
    expect(getByText('Eintrag erstellen')).toBeInTheDocument()
  })

  test('category record edit route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: `/categories/${category.id}/records/${record.id}/edit`,
    })
    expect(getByText('Eintrag bearbeiten')).toBeInTheDocument()
  })

  test('category subcategory overview route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: `/categories/${category.id}/subcategories`,
    })
    expect(getByText('Subkategorien verwalten')).toBeInTheDocument()
  })

  test('category subcategory create route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: `/categories/${category.id}/subcategories/create`,
    })
    expect(getByText('Subkategorie erstellen')).toBeInTheDocument()
  })

  test('category subcategory edit route', (): void => {
    const { getByText } = renderWithAppRoot(<Categories {...propsFixture} />, {
      route: `/categories/${category.id}/subcategories/1/edit`,
    })
    expect(getByText('Subkategorie bearbeiten')).toBeInTheDocument()
  })
})
