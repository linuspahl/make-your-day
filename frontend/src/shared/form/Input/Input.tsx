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

const Input = (props: Props): React.ReactElement => {
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
