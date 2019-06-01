// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryOverview from './CategoryOverview'

describe('CategoryOverview should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<CategoryOverview rootPath="/" />)
  })
})
