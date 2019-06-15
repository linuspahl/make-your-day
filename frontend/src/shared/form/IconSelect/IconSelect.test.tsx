// libraries
import * as React from 'react'
// utils
import { categoryIcons } from 'params'
import {
  renderWithAppRoot,
  fireEvent,
  leftClickOption,
  cleanup,
} from 'testUtils'
// components
import IconSelect from './IconSelect'

describe('IconSelect should', (): void => {
  afterEach(cleanup)

  test('render select option preview with correct color', (): void => {
    // We don't hardcode colors here and are using an index on the
    // categoryIcons params, to be more flexible, when changing the color params.
    const currentIconOption = categoryIcons[0]
    const selectIconOption = categoryIcons[1]
    const { getByTestId, getByText } = renderWithAppRoot(
      <IconSelect
        name="ColorInput"
        tabIndex={-1}
        onChange={(): void => {}}
        value={String(currentIconOption.value)}
      />
    )

    // To get an select option by text, we need to open the modal
    fireEvent.mouseDown(getByTestId('ContentSelect-selection'), leftClickOption)

    // and we need to query the select by a different color,
    // to make use of the getByText function
    // otherwise the current selected option would be returned as well.
    // Because we can't get the select option color preview directly,
    // need to get it based on the position of the select option title.

    const selectOptionTitle = getByText(selectIconOption.title)
    const selectOptionPreviewContainer =
      selectOptionTitle.previousElementSibling
    const selectOptionColorPreview = selectOptionPreviewContainer.firstChild
    expect(selectOptionColorPreview).toHaveClass(`la-${selectIconOption.value}`)
  })
})
