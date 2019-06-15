// libraries
import * as React from 'react'
// utils
import {
  render,
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  cleanup,
} from 'testUtils'
import { categoryColors } from 'params'
// components
import ColorSelect from './ColorSelect'

describe('ColorSelect should', (): void => {
  afterEach(cleanup)

  test('render select option preview with correct color', (): void => {
    // We don't hardcode colors here and are using an index on the
    // categoryColors params, to be more flexible.
    const { getByTestId, getByText } = renderWithAppRoot(
      <ColorSelect
        name="ColorInput"
        tabIndex={-1}
        onChange={(): void => {}}
        value={Object.keys(categoryColors)[0]}
      />
    )

    // To get an select option by text, we need to open the modal
    fireEvent.mouseDown(getByTestId('ContentSelect-selection'), leftClickOption)

    // and we need to query the select by a different color,
    // to make use of the getByText function
    // otherwise the current selected option would be returned as well.
    // Because we can't get the select option color preview directly,
    // need to get it based on the position of the select option title.
    const color = Object.keys(categoryColors)[1]
    const selectOptionTitle = getByText(color)
    const selectOptionPreviewContainer =
      selectOptionTitle.previousElementSibling
    const selectOptionColorPreview = selectOptionPreviewContainer.firstChild
    expect(selectOptionColorPreview).toHaveStyleRule(
      'background-color',
      categoryColors[color]
    )
  })
})
