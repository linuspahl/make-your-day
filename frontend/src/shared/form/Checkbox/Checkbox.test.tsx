// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Checkbox from './Checkbox'

describe('Checkbox should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Checkbox
        value={false}
        onChange={(): void => {}}
        name="Name"
        disabled={false}
        tabIndex={1}
      />
    )
  })
})
