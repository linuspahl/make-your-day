// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ActionIcon from './ActionIcon'

describe('ActionIcon should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <ActionIcon to="/" icon="check" ariaLabel="Accessibility label" />
    )
  })
})
