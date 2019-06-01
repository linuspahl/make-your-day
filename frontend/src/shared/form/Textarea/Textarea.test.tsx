// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Textarea from './Textarea'

describe('Textarea should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Textarea name="name" value="value" onChange={(): void => {}} />
    )
  })
})
