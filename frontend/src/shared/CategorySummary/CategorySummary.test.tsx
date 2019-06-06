// libraries
import * as React from 'react'
// utils
import colorTheme from 'theme'
import { cleanup, renderWithAppRoot } from 'testUtils'
import { categoryColors, categoryTextColors } from 'params'
// components
import CategorySummary from './CategorySummary'
// fixtures
import { category } from 'store/category/fixtures'

describe('CategorySummary should', (): void => {
  const theme = colorTheme()
  afterEach(cleanup)

  test('display first letter of the title, if no icon is provided', (): void => {
    const catWithNoIcon = { ...category, icon: '' }
    const { getByText } = renderWithAppRoot(
      <CategorySummary amount={10} category={catWithNoIcon} />
    )
    expect(getByText(catWithNoIcon.title[0])).toBeInTheDocument()
  })

  test('work as a link, when target is provided', (): void => {
    const target = '/example-link'
    const { getByTestId } = renderWithAppRoot(
      <CategorySummary amount={10} category={category} to={target} />
    )
    expect(getByTestId('CategorySummary').getAttribute('href')).toBe(target)
    expect(getByTestId('CategorySummary').nodeName).toBe('A')
  })

  test('should display an icon, if icon is provided', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <CategorySummary amount={10} category={category} />
    )
    expect(getByTestId('Icon')).toBeInTheDocument()
  })

  test('should display amount correctly with unit', (): void => {
    const expectedContent = `10${category.unit}`
    const { getByText } = renderWithAppRoot(
      <CategorySummary amount={10} category={category} />
    )

    expect(getByText(expectedContent)).toBeInTheDocument()
  })

  test('should display amount correctly without unit', (): void => {
    const expectedContent = `10×`
    const catWithoutUnit = { ...category, hasUnit: false }
    const { getByText } = renderWithAppRoot(
      <CategorySummary amount={10} category={catWithoutUnit} />
    )

    expect(getByText(expectedContent)).toBeInTheDocument()
  })

  test('should change colors, depending on provided category color', (): void => {
    const colorKey = 'blue'
    const catWithColor = { ...category, color: colorKey }
    const { getByTestId } = renderWithAppRoot(
      <CategorySummary amount={10} category={catWithColor} />
    )
    expect(getByTestId('CategorySummary')).toHaveStyleRule(
      'background-color',
      categoryColors[colorKey]
    )
    expect(getByTestId('CategorySummary')).toHaveStyleRule(
      'color',
      categoryTextColors[colorKey]
    )
  })

  test('should have default colors, when provided category has none', (): void => {
    const catWithoutColor = { ...category, color: '' }
    const { getByTestId } = renderWithAppRoot(
      <CategorySummary amount={10} category={catWithoutColor} />
    )
    expect(getByTestId('CategorySummary')).toHaveStyleRule(
      'background-color',
      theme.border
    )
    expect(getByTestId('CategorySummary')).toHaveStyleRule('color', theme.text)
  })
})
