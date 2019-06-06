// libraries
import * as React from 'react'
// components
import { Element } from './styles'
// interfaces
import { InputEvent } from 'types/types'

interface Props {
  disabled?: boolean
  name: string
  onChange: (event: InputEvent) => void
  required?: boolean
  tabIndex: number
  step?: string
  type?: string
  value: string
}

const Input = (props: Props): JSX.Element => {
  const {
    disabled,
    name,
    onChange,
    required,
    step,
    tabIndex,
    type,
    value,
  } = props
  return (
    <Element
      data-testid="Input"
      disabled={disabled}
      name={name}
      onChange={onChange}
      required={required}
      step={step}
      tabIndex={tabIndex}
      type={type || 'text'}
      value={value || ''}
    />
  )
}

export default Input
