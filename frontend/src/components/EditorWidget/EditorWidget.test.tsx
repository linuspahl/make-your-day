// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EditorWidget from './EditorWidget'
// fixtures
import { widget } from 'store/widget/fixtures'

describe('Widget should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <EditorWidget widget={widget} createNotificationBanner={(): void => {}} />
    )
  })
})
