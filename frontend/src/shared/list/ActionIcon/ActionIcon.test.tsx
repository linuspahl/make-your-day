// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ActionIcon from './ActionIcon'

describe('ActionIcon should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <ActionIcon to="/" icon="check" ariaLabel="Accessibility label" />
    )
  })
})
