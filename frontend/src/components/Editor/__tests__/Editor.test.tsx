// libraries
import * as React from 'react'
// utils
import { renderWithAppRoot, cleanup, mockDocument } from 'testUtils'
// components
import Editor from 'components/Editor/Editor'

describe('Editor should', (): void => {
  mockDocument()
  afterEach(cleanup)

  test('show provided valu as initial content', async (): Promise<void> => {
    const content = 'My special content!'
    const { getByText } = renderWithAppRoot(
      <Editor
        value={content}
        onBlur={(): void => {}}
        onChange={(): void => {}}
      />
    )
    expect(getByText(content)).toBeInTheDocument()
  })
})
