// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ContentSelect from './ContentSelect'

describe('ContentSelect should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(
      <ContentSelect
        onChange={() => {}}
        title="Title"
        value="value"
        renderPreview={() => <div />}
        options={[{ value: 'value', title: 'title' }]}
        tabIndex={1}
        name="Name"
        disabled={false}
      />
    )
  })
})
