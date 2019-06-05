// libraries
import * as React from 'react'
import {
  renderWithAppRoot,
  cleanup,
  fireEvent,
  leftClickOption,
} from 'testUtils'
// components
import ContentSelect from './ContentSelect'

describe('ContentSelect should', (): void => {
  const exampleProps = {
    onChange: (): void => {},
    title: 'Title',
    value: 'special-value-1',
    renderPreview: function renderPreview(): JSX.Element {
      return <div />
    },
    options: [
      { value: 'special-value-1', title: 'special-title-1' },
      { value: 'special-value-2', title: 'special-title-2' },
    ],
    tabIndex: 1,
    name: 'Name',
  }

  afterEach(cleanup)

  // Should display dynamic content correctly
  test('display title of selected option', (): void => {
    const { getByText } = renderWithAppRoot(<ContentSelect {...exampleProps} />)
    expect(getByText('special-title-1')).toBeInTheDocument()
  })

  test('display info if nothing got selected', (): void => {
    const { getByText } = renderWithAppRoot(
      <ContentSelect {...exampleProps} value={null} />
    )
    expect(getByText('Keine Auswahl')).toBeInTheDocument()
  })

  test('display an option "no selection" if allowEmpty is provided', (): void => {
    // Make sure the value prop is defined,
    // otherwise the test will always return ture, because of the placeholder
    const { getByText } = renderWithAppRoot(
      <ContentSelect {...exampleProps} value="special-titie-1" allowEmpty />
    )
    expect(getByText('Keine Auswahl')).toBeInTheDocument()
  })

  test('display a footer in the modal', (): void => {
    const footerContent = 'My special Footer content!'
    const { getByText, getByTestId } = renderWithAppRoot(
      <ContentSelect
        {...exampleProps}
        renderFooter={(): JSX.Element => <span>{footerContent}</span>}
      />
    )
    fireEvent.click(getByTestId('ContentSelect-selection'), leftClickOption)
    expect(getByText(footerContent)).toBeInTheDocument()
  })

  // Should behave correctly onClick
  test('open option modal, by click on current selection', (): void => {
    const { getByTestId } = renderWithAppRoot(
      <ContentSelect {...exampleProps} />
    )
    fireEvent.click(getByTestId('ContentSelect-selection'), leftClickOption)
    expect(getByTestId('Modal')).toBeInTheDocument()
  })

  test('not open option modal, when disabled is provided', (): void => {
    const { getByTestId, queryByTestId } = renderWithAppRoot(
      <ContentSelect {...exampleProps} disabled />
    )
    fireEvent.click(getByTestId('ContentSelect-selection'), leftClickOption)
    expect(queryByTestId('Modal')).not.toBeInTheDocument()
  })

  test('should change option when user clicks on option in list', (): void => {
    const handleInputChange = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <ContentSelect {...exampleProps} onChange={handleInputChange} />
    )
    // Open modal
    fireEvent.click(getByTestId('ContentSelect-selection'), leftClickOption)
    expect(getByTestId('Modal')).toBeInTheDocument()
    // Click on option
    const firstOption = getByTestId('ContentSelect-options').firstElementChild
    fireEvent.click(firstOption, leftClickOption)

    expect(handleInputChange).toBeCalledTimes(1)
    expect(handleInputChange).toBeCalledWith({
      target: { name: 'Name', value: 'special-value-1' },
    })
  })

  // Should behave correctly on keypress
  test('should close modal when using tab key', (): void => {
    const { queryByTestId, getByTestId } = renderWithAppRoot(
      <ContentSelect {...exampleProps} />
    )

    // Focus the input, to trigger keydown event listener
    // (happens automatically in the browser)
    const currentOption = getByTestId('ContentSelect-selection')
    currentOption.focus()
    // Open modal
    fireEvent.click(currentOption, leftClickOption)
    expect(getByTestId('Modal')).toBeInTheDocument()

    fireEvent.keyDown(currentOption, {
      key: 'Tab',
      keyCode: 9,
    })

    // Modal should be closed
    expect(queryByTestId('Modal')).not.toBeInTheDocument()
  })

  test('should close modal when using enter key', (): void => {
    const { queryByTestId, getByTestId } = renderWithAppRoot(
      <ContentSelect {...exampleProps} />
    )

    // Focus the input, to trigger keydown event listener
    // (happens automatically in the browser)
    const currentOption = getByTestId('ContentSelect-selection')
    currentOption.focus()
    // Open modal
    fireEvent.click(currentOption, leftClickOption)
    expect(getByTestId('Modal')).toBeInTheDocument()

    fireEvent.keyDown(currentOption, {
      key: 'Tab',
      keyCode: 13,
    })

    // Modal should be closed
    expect(queryByTestId('Modal')).not.toBeInTheDocument()
  })

  test('should select the next option, when usign arrow down key', (): void => {
    const handleInputChange = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <ContentSelect {...exampleProps} onChange={handleInputChange} />
    )

    // Focus the input, to trigger keydown event listener
    // (happens automatically in the browser)
    const currentOption = getByTestId('ContentSelect-selection')
    currentOption.focus()

    // Using the arrow down key, should trigger the onChange function with
    // the next item in the option list
    fireEvent.keyDown(currentOption, {
      key: 'ArrowDown',
      keyCode: 40,
    })
    expect(handleInputChange).toBeCalledTimes(1)
    expect(handleInputChange).toBeCalledWith({
      target: { name: 'Name', value: 'special-value-2' },
    })
  })

  test('should not select an option, when usign arrow down key and no next option is defined', (): void => {
    const handleInputChange = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <ContentSelect
        {...exampleProps}
        onChange={handleInputChange}
        value="special-value-2"
      />
    )

    // Focus the input, to trigger keydown event listener
    // (happens automatically in the browser)
    const currentOption = getByTestId('ContentSelect-selection')
    currentOption.focus()

    // Using the arrow down key, should trigger the onChange function with
    // the next item in the option list
    fireEvent.keyDown(currentOption, {
      key: 'ArrowDown',
      keyCode: 40,
    })
    expect(handleInputChange).not.toBeCalled()
  })

  test('should not select an option, when usign arrow up key and no prev option is defined', (): void => {
    const handleInputChange = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <ContentSelect
        {...exampleProps}
        onChange={handleInputChange}
        value="special-value-1"
      />
    )

    // Focus the input, to trigger keydown event listener
    // (happens automatically in the browser)
    const currentOption = getByTestId('ContentSelect-selection')
    currentOption.focus()

    // Using the arrow down key, should trigger the onChange function with
    // the next item in the option list
    fireEvent.keyDown(currentOption, {
      key: 'ArrowUp',
      keyCode: 38,
    })
    expect(handleInputChange).not.toBeCalled()
  })

  test('should select the previous option, when usign arrow down key', (): void => {
    // it would be cleaner to combine this test with the previuos one, but
    // currently the @testing-library/
    const handleInputChange = jest.fn()
    const { getByTestId } = renderWithAppRoot(
      <ContentSelect
        {...exampleProps}
        onChange={handleInputChange}
        value="special-value-2"
      />
    )

    // Focus the input, to trigger keydown event listener
    // (happens automatically in the browser)
    const currentOption = getByTestId('ContentSelect-selection')
    currentOption.focus()

    // Using the arrow down key, should trigger the onChange function with
    // the next item in the option list
    fireEvent.keyDown(currentOption, {
      key: 'ArrowUp',
      keyCode: 38,
    })
    expect(handleInputChange).toBeCalledTimes(1)
    expect(handleInputChange).toBeCalledWith({
      target: { name: 'Name', value: 'special-value-1' },
    })
  })
})
