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
  type?: string
  value: string
}

const Textarea = (props: Props): React.ReactElement => {
  const { type, name, onChange, required, disabled, value } = props
  return (
    <Element
      disabled={disabled}
      name={name}
      onChange={onChange}
      required={required}
      type={type || 'text'}
      value={value || ''}
    />
  )
}

export default Textarea
