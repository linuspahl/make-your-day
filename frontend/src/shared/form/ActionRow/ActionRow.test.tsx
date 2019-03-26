// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ActionRow from './ActionRow'

describe('ActionRow should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<ActionRow>Content</ActionRow>)
  })
})
