// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIconOverview from './CategoryIconOverview'

describe('CategoryIconOverview should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<CategoryIconOverview />)
  })
})
