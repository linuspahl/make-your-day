// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import Navigation from './Navigation'

describe('Navigation should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <Navigation rootPath="/" toggleAction={() => {}} />
    )
  })
})
