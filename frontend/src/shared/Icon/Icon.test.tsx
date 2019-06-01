// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Icon from './Icon'

describe('Icon should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Icon title="close" />)
  })
})
