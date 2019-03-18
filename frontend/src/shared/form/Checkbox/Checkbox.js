import React from 'react'
import styled from 'styled-components'
import Icon from 'shared/Icon/Icon'

const Wrapper = styled.div`
  position: relative;

  height: 40px;
  width: 40px;

  border: 1px solid ${props => props.theme.border};

  color: ${props => (props.disabled ? props.theme.border : props.theme.text)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`

const Element = styled.input`
  position: relative;
  height: 100%;
  width: 100%;

  background-color: transparent;
  border-radius: 0;
  border: 0;

  appearance: none;

  cursor: inherit;
`

const Checkmark = styled.div`
  position: absolute;

  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
`

const Checkbox = props => {
  const { value, onChange, name, disabled, tabIndex } = props
  return (
    <Wrapper disabled={disabled}>
      {value && (
        <Checkmark>
          <Icon title="check" />
        </Checkmark>
      )}
      <Element
        checked={value || false}
        disabled={disabled}
        name={name}
        onChange={onChange}
        tabIndex={tabIndex}
        type="checkbox"
      />
    </Wrapper>
  )
}

export default Checkbox
