// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordEdit from 'components/RecordEdit/RecordEdit'

describe('RecordEdit should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <RecordEdit>Page content</RecordEdit>
    )
  })
})
