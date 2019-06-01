// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import ContentSelect from './ContentSelect'

describe('ContentSelect should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <ContentSelect
        onChange={(): void => {}}
        title="Title"
        value="value"
        renderPreview={(): JSX.Element => <div />}
        options={[{ value: 'value', title: 'title' }]}
        tabIndex={1}
        name="Name"
        disabled={false}
      />
    )
  })
})
