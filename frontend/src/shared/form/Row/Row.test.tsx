// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Row from './Row'

describe('Row should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<Row>Content</Row>)
  })
})
