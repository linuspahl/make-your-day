// libraries
import React from 'react'
// components
import { Wrapper, CheckboxWrapper, Checkmark, Element } from './styles'
import Icon from 'shared/Icon/Icon'
// interfaces
import { InputEvent } from 'types/types'
import { MutationOptions } from 'react-apollo'

const renderCheckbox = (props: Props): JSX.Element => {
  const { value, onChange, id, name, disabled, tabIndex, label } = props
  return (
    <CheckboxWrapper
      disabled={disabled}
      data-testid="Checkbox"
      hasLabel={!!label}
    >
      {value && (
        <Checkmark>
          <Icon title="check" />
        </Checkmark>
      )}
      <Element
        checked={value || false}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        tabIndex={tabIndex}
        type="checkbox"
      />
    </CheckboxWrapper>
  )
}

interface Props {
  disabled?: boolean
  id?: string
  // label - will normally be used, optional for better modularity
  label?: string
  name: string
  onChange: (event: InputEvent | MutationOptions) => void
  tabIndex: number
  value: boolean
}

const Checkbox = (props: Props): JSX.Element => {
  const { label } = props
  return label ? (
    <Wrapper>
      {renderCheckbox(props)}
      {label}
    </Wrapper>
  ) : (
    renderCheckbox(props)
  )
}

export default Checkbox
