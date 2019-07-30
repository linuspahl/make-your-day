// libraries
import * as React from 'react'
// utils
import { render } from 'testUtils'
// components
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'

describe('PlaceholderGroup should', (): void => {
  test('display content', (): void => {
    const children = 'My special PlaceholderGroup content!'
    const { getByText } = render(
      <PlaceholderGroup>{children}</PlaceholderGroup>
    )
    expect(getByText(children)).toBeInTheDocument()
  })
})
