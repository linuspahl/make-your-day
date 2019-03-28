// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridBody from './GridBody'

describe('GridBody should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <GridBody columnAmount={1}>Content</GridBody>
    )
  })
})
