// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import ActionRow from './ActionRow'

describe('ActionRow should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<ActionRow>Content</ActionRow>)
  })
})
