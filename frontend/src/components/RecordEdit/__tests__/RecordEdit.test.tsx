// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import RecordEdit from 'components/RecordEdit/RecordEdit'

describe('RecordEdit should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <RecordEdit createNotificationBanner={(): void => {}}>
        Page content
      </RecordEdit>
    )
  })
})
