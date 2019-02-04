// ContentSelect component. Needed to create form selects with more content for the options than just a string.
// This component behaves exactly like a normal html <select>, e.g. in case of form tab navigation and other key usage
// The only disadvantage is, all form elements require a tabIndex
// If a selection is not required, add an option with the title '-' an without any value

// libraries
import React from 'react'
// components
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import Icon from 'shared/Icon/Icon'

import {
  Layout,
  Select,
  Header,
  Modal,
  OptionsWrapper,
  OptionsOffset,
  Options,
  OptionPreview,
  Option,
  ArrowIcon,
} from './styles'

export default class ContentSelect extends React.Component {
  constructor(props) {
    super(props)

    // isOpen represents if the select dropdown is open
    this.state = { isOpen: false }

    this.toggleSelect = this.toggleSelect.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.detectKeydown = this.detectKeydown.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  render() {
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

    return (
      <Layout>
        <Select
          id={name}
          tabIndex={disabled ? 'none' : tabIndex}
          onClick={() => (!disabled ? this.toggleSelect() : null)}
          onFocus={disabled ? null : this.onFocus}
          onBlur={disabled ? null : this.onBlur}
        >
          {value ? value : '-'}
          <ArrowIcon>
            <Icon title="angle-down" />
          </ArrowIcon>
        </Select>
        {isOpen && (
          <OptionsWrapper>
            <OptionsOffset onClick={() => this.toggleSelect()} />
            <Modal>
              {title && (
                <Header>
                  {title}
                  <CloseIcon close={this.toggleSelect} />
                </Header>
              )}
              <Options>
                {options.map(option => {
                  const isSelected = option.value === value

                  return (
                    <Option
                      isSelected={isSelected}
                      key={option.value}
                      onClick={() => this.onOptionClick(option.value)}
                    >
                      <OptionPreview>{renderPreview(option)}</OptionPreview>
                      <span>{option.title}</span>
                    </Option>
                  )
                })}
              </Options>
            </Modal>
          </OptionsWrapper>
        )}
      </Layout>
    )
  }

  // Toggle select dropdown
  toggleSelect() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  // Change form state with the selected value
  changeValue(value) {
    const { onChange, name } = this.props
    onChange({
      target: { name, value },
    })
  }

  // This function provides the same key navigation like the default html <select>
  // The only litte difference, the user is able to close the dropdown with the space key
  // This is not realy a disadvantage for the user and makes the code smaller
  detectKeydown(event) {
    const { options, value } = this.props
    const { isOpen } = this.state
    const { keyCode } = event

    // Disable tab navigation, when select is open and close select instead
    if (keyCode === 9 && isOpen) {
      event.preventDefault()
      this.toggleSelect()
    }

    // Detect space an enter key and toggle select
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
  onFocus() {
    document.addEventListener('keydown', this.detectKeydown, false)
  }

  // onBlur will be triggered, when the user deselects / loses the focus of the component
  onBlur() {
    document.removeEventListener('keydown', this.detectKeydown, false)
  }

  // When user clicks on option, update the form ond close the select
  onOptionClick(value) {
    this.changeValue(value)
    this.toggleSelect()
  }
}
