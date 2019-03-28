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
  type?: string
  value: string
}

const Input = (props: Props): React.ReactElement => {
  const { disabled, name, onChange, required, tabIndex, type, value } = props
  return (
    <Element
      disabled={disabled}
      name={name}
      onChange={onChange}
      required={required}
      type={type || 'text'}
      value={value || ''}
      tabIndex={tabIndex}
    />
  )
}

export default Input
