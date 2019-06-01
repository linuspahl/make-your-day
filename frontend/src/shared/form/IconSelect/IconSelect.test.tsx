// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconSelect from './IconSelect'

describe('IconSelect should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <IconSelect
        value="value"
        onChange={(): void => {}}
        name="name"
        tabIndex={1}
      />
    )
  })
})
