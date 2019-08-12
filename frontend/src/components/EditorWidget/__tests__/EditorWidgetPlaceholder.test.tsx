// libraries
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
// components
import EditorWidgetPlaceholder from 'components/EditorWidget/EditorWidgetPlaceholder'

describe('EditorWidgetPlaceholder should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(<EditorWidgetPlaceholder />)
  })
})
