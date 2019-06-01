// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ContentBox from './ContentBox'

describe('ContentBox should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<ContentBox>Content</ContentBox>)
  })
})
