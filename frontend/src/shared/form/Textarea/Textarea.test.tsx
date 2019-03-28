// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Textarea from './Textarea'

describe('Textarea should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Textarea name="name" value="value" onChange={() => {}} />
    )
  })
})
