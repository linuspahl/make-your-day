// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import Dashboard from './Dashboard'

describe('Dashboard should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(<Dashboard>Content</Dashboard>)
  })
})
