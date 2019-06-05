// libraries
import * as React from 'react'
import { cleanup, renderWithAppRoot } from 'testUtils'
// components
import ActionRow from './ActionRow'

describe('ActionRow should', (): void => {
  const children = 'My special ActionRow content!'
  afterEach(cleanup)

  test('display content', (): void => {
    const { getByText } = renderWithAppRoot(<ActionRow>{children}</ActionRow>)
    expect(getByText(children)).toBeInTheDocument()
  })

  test('align content centered, when it has one child', (): void => {
    const { getByTestId } = renderWithAppRoot(<ActionRow>{children}</ActionRow>)

    expect(getByTestId('Row')).toHaveStyleRule('justify-content', 'center')
  })

  test('align content with space-between, when it has more then one child', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <ActionRow>
        <span>{children}</span>
        <span>{children}</span>
      </ActionRow>
    )

    expect(getByTestId('Row')).toHaveStyleRule(
      'justify-content',
      'space-between'
    )
  })

  test('change the direction of its children, when leftHandMode setting is enabled', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <ActionRow>
        <span>{children}</span>
        <span>{children}</span>
      </ActionRow>,
      { themeProps: { leftHandMode: true } }
    )

    expect(getByTestId('Row')).toHaveStyleRule('flex-direction', 'row-reverse')
  })
})
