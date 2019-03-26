// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryOverview from './CategoryOverview'

describe('CategoryOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CategoryOverview rootPath="/" />)
  })
})
