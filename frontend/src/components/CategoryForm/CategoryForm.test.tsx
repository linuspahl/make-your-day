// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategoryForm from './CategoryForm'

describe('CategoryForm should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <CategoryForm rootPath="/" submitAction={() => {}} />
    )
  })
})
