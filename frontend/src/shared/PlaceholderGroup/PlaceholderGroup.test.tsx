// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PlaceholderGroup from './PlaceholderGroup'

describe('PlaceholderGroup should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <PlaceholderGroup>Content</PlaceholderGroup>
    )
  })
})
