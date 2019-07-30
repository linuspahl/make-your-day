// libraries
import * as React from 'react'
// utils
import { cleanup, renderWithAppRoot } from 'testUtils'
import { categoryColors, categoryTextColors } from 'params'
// components
import CategoryIcon from './CategoryIcon'

describe('CategoryIcon should', (): void => {
  afterEach(cleanup)

  test('display first letter of the title, if no icon is provided', (): void => {
    const { getByText } = renderWithAppRoot(<CategoryIcon title="Title" />)
    expect(getByText('T')).toBeInTheDocument()
  })

  test('work as a link, when target is provided', (): void => {
    const target = '/example-link'
    const { getByTestId } = renderWithAppRoot(
      <CategoryIcon title="Title" to={target} />
    )
    expect(getByTestId('CategoryIcon').getAttribute('href')).toBe(target)
    expect(getByTestId('CategoryIcon').nodeName).toBe('A')
  })

  test('should display an icon, if icon is provided', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <CategoryIcon title="Title" icon="IconName" />
    )
    expect(getByTestId('Icon')).toBeInTheDocument()
  })

  test('should change colors, depending on provided category color', (): void => {
    const colorKey = 'blue'
    const { getByTestId } = renderWithAppRoot(
      <CategoryIcon title="Title" color={colorKey} />
    )
    expect(getByTestId('CategoryIcon')).toHaveStyleRule(
      'background-color',
      categoryColors[colorKey]
    )
    expect(getByTestId('CategoryIcon')).toHaveStyleRule(
      'color',
      categoryTextColors[colorKey]
    )
  })

  test('should change font-size size, depending on provided size', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <CategoryIcon title="Title" icon={'IconName'} size={2.5} />
    )
    expect(getByTestId('CategoryIcon')).toHaveStyleRule('font-size', '1.25rem')
  })
})
