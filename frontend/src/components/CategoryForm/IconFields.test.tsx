// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconFields from './IconFields'

describe('IconFields should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <IconFields title="Title" handleInputChange={(): void => {}} />
    )
  })
})
