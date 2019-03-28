// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Input from './Input'

describe('Input should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Input name="Name" onChange={() => {}} tabIndex={1} value="value" />
    )
  })
})
