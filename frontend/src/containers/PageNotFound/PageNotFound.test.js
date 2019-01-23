// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import PageNotFound from './PageNotFound'

describe('PageNotFound should', () => {
  test('render without crashing', () => {
    new ShallowRenderer().render(
      <PageNotFound isUserLoggedIn updateLocalStorage={() => {}} />
    )
  })
})
