// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIconPlaceholder from './CategoryIconPlaceholder'

describe('CategoryIconPlaceholder should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CategoryIconPlaceholder size={10}/>)
  })
})
