// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconFields from './IconFields'

describe('IconFields should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<IconFields title="Title" handleInputChange={() => {}}/>)
  })
})
