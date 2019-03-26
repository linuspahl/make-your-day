// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIcon from './CategoryIcon'

describe('CategoryIcon should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CategoryIcon title="Title" size={10}/>)
  })
})
