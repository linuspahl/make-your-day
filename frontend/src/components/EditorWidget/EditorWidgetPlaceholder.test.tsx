// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import EditorWidgetPlaceholder from './EditorWidgetPlaceholder'

describe('EditorWidgetPlaceholder should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<EditorWidgetPlaceholder />)
  })
})
