// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import GridHead from './GridHead'

describe('GridHead should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <GridHead>
        <div>Content1</div>
        <div>Content2</div>
      </GridHead>)
  })
})
