// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordCreate from './RecordCreate'

describe('RecordCreate should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <RecordCreate createNotificationBanner={(): void => {}}>
        Page content
      </RecordCreate>
    )
  })
})
