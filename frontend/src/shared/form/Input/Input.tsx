// libraries
import * as React from 'react'
// components
import { Element } from './styles'
// interfaces
import { InputEvent } from 'types/types'

export interface Props {
  className?: string
  dataTestid?: string
  disabled?: boolean
  id?: string
  initRef?: React.RefObject<HTMLInputElement>
  name: string
  onBlur?: (event: InputEvent) => void
  onChange: (event: InputEvent) => void
  onClick?: () => void
  onFocus?: (event: InputEvent) => void
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  step?: string
  tabIndex: number
  type?: string
  value: string | number
}

const Input = (props: Props): JSX.Element => {
  const {
    className,
    dataTestid,
    disabled,
    id,
    initRef,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onMouseDown,
    placeholder,
    required,
    step,
    tabIndex,
    type,
    value,
  } = props
  return (
    <Element
      data-testid={dataTestid || 'Input'}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      placeholder={placeholder}
      required={required}
      step={step}
      tabIndex={tabIndex}
      type={type || 'text'}
      value={value || ''}
      ref={initRef}
      onMouseDown={onMouseDown}
      className={className}
    />
  )
}

export default Input
