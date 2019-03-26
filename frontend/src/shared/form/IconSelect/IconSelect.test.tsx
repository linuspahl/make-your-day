// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconSelect from './IconSelect'

describe('IconSelect should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<IconSelect
      value="value"
      onChange={() => {}}
      name="name"
      tabIndex={1}
  />)
  })
})
