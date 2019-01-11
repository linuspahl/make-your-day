import React from 'react'
import styled from 'styled-components'

const Element = styled.input`
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: #fff;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0;

  cursor: pointer;
  appearance: none;
  overflow: hidden;

  &:checked :before {
    background-color: white;
    content: '✓';
    font-size: 32px;
  }
`

export default props => {
  const { checked, onChange, name, disabled, tabIndex } = props
  return (
    <Element
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      tabIndex={tabIndex}
    />
  )
}
