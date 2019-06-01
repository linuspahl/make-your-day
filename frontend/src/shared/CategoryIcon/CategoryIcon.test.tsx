// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryIcon from './CategoryIcon'

describe('CategoryIcon should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <CategoryIcon title="Title" size={10} />
    )
  })
})
