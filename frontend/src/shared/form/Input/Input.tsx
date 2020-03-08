// libraries
import React from 'react'
// components
import { Wrapper, InputElement, InputLabel } from './styles'
// interfaces
import { InputEvent } from 'types/types'

export interface Props {
  autocomplete?: string
  className?: string
  dataTestid?: string
  disabled?: boolean
  id?: string
  initRef?: React.RefObject<HTMLInputElement>
  label?: string
  name: string
  onBlur?: (event: InputEvent) => void
  onChange: (event: InputEvent) => void
  onClick?: () => void
  onFocus?: (event: InputEvent) => void
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void
  required?: boolean
  step?: string
  tabIndex: number
  type?: string
  value: string | number
}

const Input = ({
  autocomplete,
  className,
  dataTestid,
  disabled,
  id,
  initRef,
  label,
  name,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onMouseDown,
  required,
  step,
  tabIndex,
  type,
  value,
}: Props): JSX.Element => (
  <Wrapper>
    <InputElement
      autoComplete={autocomplete}
      data-testid={dataTestid || 'Input'}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      required={required}
      step={step}
      tabIndex={tabIndex}
      type={type || 'text'}
      value={value || ''}
      ref={initRef}
      onMouseDown={onMouseDown}
      className={className}
    />
    {label && <InputLabel>{label}</InputLabel>}
  </Wrapper>
)

export default Input
