// libraries
import React from 'react'
import { renderWithAppRoot, cleanup } from 'testUtils'
// components
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'

describe('ActionIconWrapper should', (): void => {
  afterEach(cleanup)

  test('render without crashing', (): void => {
    const children = 'Content'
    const { getByText } = renderWithAppRoot(
      <ActionIconWrapper>{children}</ActionIconWrapper>
    )
    expect(getByText(children)).toBeInTheDocument()
  })
})
