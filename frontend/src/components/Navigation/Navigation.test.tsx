// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Navigation from './Navigation'

describe('Navigation should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <Navigation rootPath="/" toggleAction={(): void => {}} />
    )
  })
})
