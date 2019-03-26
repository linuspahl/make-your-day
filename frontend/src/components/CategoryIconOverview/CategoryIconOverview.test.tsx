// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIconOverview from './CategoryIconOverview'

describe('CategoryIconOverview should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CategoryIconOverview />)
  })
})
