import React from 'react'
import styled from 'styled-components'

const Element = styled.input`
  width: 100%;
  height: 40px;

  padding: 0 10px;
  margin-top: 3px;
  border-radius: 0;
  border: 1px solid ${props => props.theme.border};

  color: ${props => (props.disabled ? '#b5b5b5' : props.theme.text)};
  box-shadow: none;
  appearance: none;
  background-color: transparent;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'text')};
`

export default props => {
  const { type, name, onChange, required, disabled, value, tabIndex } = props
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
