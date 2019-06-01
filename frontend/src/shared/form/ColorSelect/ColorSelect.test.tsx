// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ColorSelect from './ColorSelect'

describe('ColorSelect should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <ColorSelect
        value="Color"
        tabIndex={1}
        name="Name"
        onChange={(): void => {}}
      />
    )
  })
})
