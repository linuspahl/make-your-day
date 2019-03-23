// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ListItem from './ListItem'

describe('ListItem should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<ListItem tabIndex={1}>Content</ListItem>)
  })
})
