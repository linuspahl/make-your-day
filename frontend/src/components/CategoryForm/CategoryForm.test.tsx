// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryForm from './CategoryForm'

describe('CategoryForm should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <CategoryForm rootPath="/" submitAction={(): void => {}} />
    )
  })
})
