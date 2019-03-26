// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import PlaceholderGroup from './PlaceholderGroup'

describe('PlaceholderGroup should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<PlaceholderGroup>Content</PlaceholderGroup>)
  })
})
