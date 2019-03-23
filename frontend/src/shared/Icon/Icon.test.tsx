// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Icon from './Icon'

describe('Icon should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<Icon title="close" />)
  })
})
