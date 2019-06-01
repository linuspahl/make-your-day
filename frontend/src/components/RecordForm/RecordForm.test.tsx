// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordForm from './RecordForm'
// fixtures
import { category } from 'store/category/fixtures'

describe('RecordForm should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <RecordForm
        category={category}
        rootPath="/"
        submitAction={(): void => {}}
      />
    )
  })
})
