// ContentSelect component. Needed to create form selects with more content for the options than just a string.
// This component behaves exactly like a normal html <select>, e.g. in case of form tab navigation and other key usage
// The only disadvantage is, all form elements require a tabIndex
// If a selection is not required, add an option with the title '-' an without any value

// libraries
import * as React from 'react'
// components
import Icon from 'shared/Icon/Icon'
import Modal from 'shared/Modal/Modal'
// interfaces
import { SelectOption, InputEvent } from 'types/types'

import {
  Layout,
  Select,
  Options,
  OptionPreview,
  Option,
  ArrowIcon,
} from './styles'

interface Props {
  disabled?: boolean
  name: string
  onChange: (event: InputEvent) => void
  options: SelectOption[]
  renderPreview?: (option: SelectOption) => React.ReactChild
  tabIndex: number
  title: string
  value: string | number
}

interface State {
  isOpen: boolean
}

export default class ContentSelect extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    // isOpen represents if the select dropdown is open
    this.state = { isOpen: false }

    this.toggleSelect = this.toggleSelect.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.detectKeydown = this.detectKeydown.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  public render(): React.ReactElement {
    const {
      title,
      value,
      renderPreview,
      options,
      tabIndex,
      name,
      disabled,
    } = this.props
    const { isOpen } = this.state
    const hasPreview = typeof renderPreview == 'function'
    const currentOption = options.find(option => option.value === value)

    return (
      <Layout>
        <Select
          id={name}
          tabIndex={disabled ? -1 : tabIndex}
          onClick={() => (!disabled ? this.toggleSelect() : null)}
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
              {options.map(option => {
                const isSelected = option.value === value

                return (
                  <Option
                    isSelected={isSelected}
                    key={option.value}
                    onClick={() => this.onOptionClick(option.value)}
                  >
                    <React.Fragment>
                      {hasPreview && (
                        <OptionPreview>{renderPreview(option)}</OptionPreview>
                      )}
                      <span>{option.title}</span>
                    </React.Fragment>
                  </Option>
                )
              })}
            </Options>
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
    const { options, value } = this.props
    const { isOpen } = this.state
    const { keyCode } = event

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
      const currentIndex = options.findIndex(option => option.value === value)

      // On arrow down select next option
      if (keyCode === 40) {
        const nextOption = options[currentIndex + 1]
        if (nextOption) {
          this.changeValue(nextOption.value)
        }
      }

      // On arrow up select previous option
      if (keyCode === 38) {
        const prevOption = options[currentIndex - 1]
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
}
