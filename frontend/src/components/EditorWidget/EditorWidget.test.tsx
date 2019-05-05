// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EditorWidget from './EditorWidget'
// fixtures
import { widget } from 'store/widget/fixtures'

describe('Widget should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <EditorWidget widget={widget} createNotificationBanner={() => {}} />
    )
  })
})
