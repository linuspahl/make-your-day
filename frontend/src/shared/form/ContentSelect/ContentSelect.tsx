// ContentSelect component. Needed to create form selects with more content for the options than just a string.
// This component behaves exactly like a normal html <select>, e.g. in case of form tab navigation and other key usage
// The only disadvantage is, all form elements require a tabIndex
// If a selection is not required, add an option with the title '-' an without any value

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
  name: string
  onChange: (event: InputEvent) => void
  options: SelectOption[]
  renderPreview?: (option: SelectOption) => React.ReactChild
  renderFooter?: () => React.ReactChild
  tabIndex: number
  title: string
  value: string | number
}

interface State {
  isOpen: boolean
}

export default class ContentSelect extends React.Component<Props, State> {
  private sortedOptions: SelectOption[]

  public constructor(props: Props) {
    super(props)

    // isOpen represents if the select dropdown is open
    this.state = { isOpen: false }

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

  public render(): JSX.Element {
    const {
      title,
      value,
      renderPreview,
      renderFooter,
      tabIndex,
      name,
      disabled,
    } = this.props

    const { isOpen } = this.state
    const hasPreview = typeof renderPreview == 'function'
    const hasFooter = typeof renderFooter == 'function'
    const sortedOptions = this.sortedOptions
    const currentOption = sortedOptions.find(
      (option): boolean => option.value === value
    )

    return (
      <Layout>
        <Select
          id={name}
          tabIndex={disabled ? -1 : tabIndex}
          onClick={(): void => (!disabled ? this.toggleSelect() : null)}
          onFocus={disabled ? null : this.onFocus}
          onBlur={disabled ? null : this.onBlur}
        >
          {value && currentOption ? currentOption.title : 'Keine Auswahl'}
          <ArrowIcon>
            <Icon title="angle-down" />
          </ArrowIcon>
        </Select>
        {isOpen && (
          <Modal headline={title} toggleAction={this.toggleSelect}>
            <Options>
              {sortedOptions.map(
                (option): JSX.Element => {
                  const isSelected = option.value === value

                  return (
                    <Option
                      isSelected={isSelected}
                      key={option.value}
                      onClick={(): void => this.onOptionClick(option.value)}
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
  private toggleSelect(): void {
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

    // Disable tab navigation, when select is open and close select instead
    if (keyCode === 9 && isOpen) {
      event.preventDefault()
      this.toggleSelect()
    }

    // Detect space and enter key and toggle select
    if (keyCode === 13 || keyCode === 32) {
      // We need to prevent the default window scrolling for the space key
      // And the default form submit for the enter key
      event.preventDefault()
      this.toggleSelect()
    }

    // Detect arrow up and arrow down key
    if (keyCode === 40 || keyCode === 38) {
      // We need to prevent the default window scrolling for the arrow keys
      event.preventDefault()

      // Get current option index
      const currentIndex = sortedOptions.findIndex(
        (option): boolean => option.value === value
      )

      // On arrow down select next option
      if (keyCode === 40) {
        const nextOption = sortedOptions[currentIndex + 1]
        if (nextOption) {
          this.changeValue(nextOption.value)
        }
      }

      // On arrow up select previous option
      if (keyCode === 38) {
        const prevOption = sortedOptions[currentIndex - 1]
        if (prevOption) {
          this.changeValue(prevOption.value)
        }
      }
    }
  }

  // onFocus will be triggered, when the user selects / focus the component
  private onFocus(): void {
    document.addEventListener('keydown', this.detectKeydown, false)
  }

  // onBlur will be triggered, when the user deselects / loses the focus of the component
  private onBlur(): void {
    document.removeEventListener('keydown', this.detectKeydown, false)
  }

  // When user clicks on option, update the form ond close the select
  private onOptionClick(value: string | number): void {
    this.changeValue(value)
    this.toggleSelect()
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
