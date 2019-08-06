// ContentSelect component. Needed to create form selects with more content for the options than just a string.
// This component behaves exactly like a normal html <select>, e.g. in case of form tab navigation and other key usage
// If a selection has no default value, add an option with the title '-' an without any value

// libraries
import * as React from 'react'
// utils
import { sortBy } from 'lodash'
// components
import Icon from 'shared/Icon/Icon'
import Modal from 'shared/Modal/Modal'
// interfaces
import { SelectOption, InputEvent } from 'types/types'

import {
  ArrowIcon,
  Footer,
  Layout,
  Option,
  OptionPreview,
  Options,
  Select,
} from './styles'

interface Props {
  allowEmpty?: boolean
  disabled?: boolean
  id?: string
  label: string
  name: string
  onChange: (event: InputEvent) => void
  options: SelectOption[]
  renderFooter?: () => JSX.Element
  renderPreview?: (option: SelectOption) => JSX.Element
  required?: boolean
  tabIndex: number
  type?: string
  value: string | number
}

interface State {
  isOpen: boolean
}

export default class ContentSelect extends React.Component<Props, State> {
  private sortedOptions: SelectOption[]
  private select: React.RefObject<HTMLInputElement>

  public constructor(props: Props) {
    super(props)

    // isOpen represents if the select dropdown is open
    this.state = { isOpen: false }
    this.select = React.createRef()

    // Since we need to sort the options and don't want to do it multiple times
    // we store them in a class variable
    this.sortedOptions = this.prepareOptions()

    this.prepareOptions = this.prepareOptions.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.detectKeydown = this.detectKeydown.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  public componentWillUnmount(): void {
    // If the component unmounts, we wnat to be 100% sure,
    // to remove the event listener, to avoid memory leaks
    this.onBlur()
  }

  public render(): JSX.Element {
    const {
      disabled,
      id,
      label,
      name,
      renderFooter,
      renderPreview,
      required,
      tabIndex,
      type,
      value,
    } = this.props

    const { isOpen } = this.state
    const hasPreview = typeof renderPreview == 'function'
    const hasFooter = typeof renderFooter == 'function'
    const sortedOptions = this.sortedOptions
    const currentOption = sortedOptions.find(
      (option): boolean => option.value == value
    )

    return (
      <Layout>
        <Select
          label={label}
          disabled={disabled}
          autocomplete="off"
          type={type || 'text'}
          dataTestid="ContentSelect-selection"
          id={id}
          initRef={this.select}
          name={name}
          onBlur={disabled ? null : this.onBlur}
          onChange={(): void => {}}
          onFocus={disabled ? null : this.onFocus}
          onMouseDown={(event: React.MouseEvent<HTMLInputElement>): void =>
            !disabled && !isOpen ? this.toggleSelect(event) : null
          }
          required={required}
          tabIndex={disabled ? -1 : tabIndex}
          value={value && currentOption ? currentOption.title : 'Bitte wählen'}
        />
        <ArrowIcon
          onMouseDown={(event: React.MouseEvent<HTMLInputElement>): void =>
            !disabled && !isOpen ? this.toggleSelect(event) : null
          }
        >
          <Icon title="angle-down" />
        </ArrowIcon>
        {isOpen && (
          <Modal headline={label} toggleAction={this.toggleSelect}>
            <Options data-testid="ContentSelect-options">
              {sortedOptions.map(
                (option): JSX.Element => {
                  const isSelected = option.value == value

                  return (
                    <Option
                      isSelected={isSelected}
                      key={option.value}
                      clickAction={(
                        event: React.MouseEvent<HTMLElement>
                      ): void => this.onOptionClick(event, option.value)}
                    >
                      <React.Fragment>
                        {hasPreview && (
                          <OptionPreview>{renderPreview(option)}</OptionPreview>
                        )}
                        <span>{option.title}</span>
                      </React.Fragment>
                    </Option>
                  )
                }
              )}
            </Options>
            {hasFooter && <Footer>{renderFooter()}</Footer>}
          </Modal>
        )}
      </Layout>
    )
  }

  // Toggle select dropdown
  private toggleSelect(
    event:
      | React.MouseEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | KeyboardEvent
  ): void {
    event.preventDefault()
    this.select.current.focus()
    this.setState({ isOpen: !this.state.isOpen })
  }

  // Change form state with the selected value
  private changeValue(value: string | number): void {
    const { onChange, name } = this.props
    onChange({
      target: { name, value },
    })
  }

  // This function provides the same key navigation like the default html <select>
  // The only litte difference, the user is able to close the dropdown with the space key
  // This is not realy a disadvantage for the user and makes the code smaller
  private detectKeydown(event: KeyboardEvent): void {
    const { value } = this.props
    const { isOpen } = this.state
    const { keyCode } = event
    const sortedOptions = this.sortedOptions

    // Disable tab navigation (keyCode 9), when select is open and close select instead
    if (keyCode == 9 && isOpen) {
      event.preventDefault()
      this.toggleSelect(event)
    }

    // Detect space (keyCode 13) and enter key (keyCode 32) and toggle select
    if (keyCode == 13 || keyCode == 32) {
      // We need to prevent the default window scrolling for the space key
      // And the default form submit for the enter key
      event.preventDefault()
      this.toggleSelect(event)
    }

    // Detect arrow up (keyCode 40) and arrow down key (keyCode 38)
    if (keyCode == 40 || keyCode == 38) {
      // We need to prevent the default window scrolling for the arrow keys
      event.preventDefault()

      // Get current option index
      const currentIndex = sortedOptions.findIndex(
        (option): boolean => option.value == value
      )

      // On arrow down (keyCode 40) select next option
      if (keyCode == 40) {
        const nextOption = sortedOptions[currentIndex + 1]
        if (nextOption) {
          this.changeValue(nextOption.value)
        }
      }

      // On arrow up select (keyCode 38) previous option
      if (keyCode == 38) {
        const prevOption = sortedOptions[currentIndex - 1]
        if (prevOption) {
          this.changeValue(prevOption.value)
        }
      }
    }
  }

  // onFocus will be triggered, when the user selects / focus the component
  private onFocus(): void {
    document.addEventListener('keydown', this.detectKeydown)
  }

  // onBlur will be triggered, when the user deselects / loses the focus of the component
  private onBlur(): void {
    document.removeEventListener('keydown', this.detectKeydown)
  }

  // When user clicks on option, update the form ond close the select
  private onOptionClick(
    event: React.MouseEvent<HTMLElement>,
    value: string | number
  ): void {
    event.preventDefault()
    this.changeValue(value)
    this.toggleSelect(event)
  }

  private prepareOptions(): SelectOption[] {
    // Sort options by title, will return an empty array, when there are no options
    let sortedProps = sortBy(this.props.options, 'title')

    // If no selection is possible, we add this option in this step.
    // It's important to do this after the sorting, to show this option at top.
    if (this.props.allowEmpty) {
      sortedProps = [{ value: null, title: 'Keine Auswahl' }, ...sortedProps]
    }

    return sortedProps
  }
}
