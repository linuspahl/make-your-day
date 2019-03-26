// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import CategorySummary from './CategorySummary'
// fixtures
import { categoryPlain } from 'store/category/fixtures'

describe('CategorySummary should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<CategorySummary amount={10} category={categoryPlain} />)
  })
})
