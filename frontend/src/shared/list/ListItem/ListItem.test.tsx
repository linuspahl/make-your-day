// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ListItem from './ListItem'

describe('ListItem should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <ListItem tabIndex={1}>Content</ListItem>
    )
  })
})
