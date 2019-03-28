// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Checkbox from './Checkbox'

describe('Checkbox should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Checkbox
        value={false}
        onChange={() => {}}
        name="Name"
        disabled={false}
        tabIndex={1}
      />
    )
  })
})
