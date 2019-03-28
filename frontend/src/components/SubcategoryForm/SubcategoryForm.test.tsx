// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import SubcategoryForm from './SubcategoryForm'
// fixtures
import { category } from 'store/category/fixtures'

describe('SubcategoryForm should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <SubcategoryForm
        rootPath="/"
        parentCategory={category}
        submitAction={() => {}}
      />
    )
  })
})
