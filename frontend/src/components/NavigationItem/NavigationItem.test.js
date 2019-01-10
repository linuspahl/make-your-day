// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import NavigationItem from './NavigationItem'

describe('NavigationItem should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(
      <NavigationItem route={{ title: 'Dashboard', path: '/' }} />
    )
  })
})
