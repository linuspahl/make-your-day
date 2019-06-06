// libraries
import * as React from 'react'
// components
import { Element } from './styles'
// interfaces
import { InputEvent } from 'types/types'

interface Props {
  className?: string
  defaultValue?: string
  disabled?: boolean
  name: string
  onBlur?: () => void
  onChange: (event: InputEvent) => void
  placeholder?: string
  required?: boolean
  type?: string
  value: string
}

const Textarea = (props: Props): JSX.Element => {
  const {
    className,
    disabled,
    name,
    onChange,
    onBlur,
    placeholder,
    required,
    type,
    value,
  } = props
  return (
    <Element
      data-testid="Textarea"
      className={className}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type || 'text'}
      value={value || ''}
    />
  )
}

export default Textarea
