// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Input from './Input'

describe('Input should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Input name="Name" onChange={(): void => {}} tabIndex={1} value="value" />
    )
  })
})
