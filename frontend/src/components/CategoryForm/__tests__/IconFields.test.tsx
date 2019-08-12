// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import IconFields from 'components/CategoryForm/IconFields'

describe('IconFields should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <IconFields title="Title" handleInputChange={(): void => {}} />
    )
  })
})
