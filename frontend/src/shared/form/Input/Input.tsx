// libraries
import * as React from 'react'
// components
import { Element } from './styles'
// interfaces
import { InputEvent } from 'types/types'

interface Props {
  disabled?: boolean
  id?: string
  name: string
  onChange: (event: InputEvent) => void
  required?: boolean
  step?: string
  tabIndex: number
  type?: string
  value: string | number
}

const Input = (props: Props): JSX.Element => {
  const {
    disabled,
    id,
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
      id={id}
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
