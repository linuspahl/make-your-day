// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Timeline from './Timeline'

describe('Timeline should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Timeline>Content</Timeline>)
  })
})
