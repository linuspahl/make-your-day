// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordUpdate from './RecordEdit'

describe('RecordUpdate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <RecordUpdate createNotificationBanner={(): void => {}}>
        Page content
      </RecordUpdate>
    )
  })
})
