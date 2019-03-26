// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryOverview from './SubcategoryOverview'

describe('SubcategoryOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<SubcategoryOverview rootPath="/" />)
  })
})
