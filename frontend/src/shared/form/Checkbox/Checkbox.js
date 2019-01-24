import React from 'react'
import styled from 'styled-components'

const Element = styled.input`
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.border};
  border-radius: 0;

  cursor: pointer;
  appearance: none;
  overflow: hidden;

  &:checked :before {
    content: '✓';
    font-size: 32px;
  }
`

export default props => {
  const { value, onChange, name, disabled, tabIndex } = props
  return (
    <Element
      checked={value}
      disabled={disabled}
      name={name}
      onChange={onChange}
      tabIndex={tabIndex}
      type="checkbox"
    />
  )
}
