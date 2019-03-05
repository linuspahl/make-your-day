// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EvaluatuionOverview from './EvaluatuionOverview'

describe('EvaluatuionOverview should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<EvaluatuionOverview />)
  })
})
