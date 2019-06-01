// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import NavigationItem from './NavigationItem'

describe('NavigationItem should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <NavigationItem
        rootPath="/"
        route={{ title: 'Dashboard', path: '/' }}
        toggleAction={(): void => {}}
      />
    )
  })
})
