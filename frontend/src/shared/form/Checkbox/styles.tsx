// libraries
import styled from 'styled-components'

interface WrapperProps {
  disabled?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;

  height: 40px;
  width: 40px;

  border: 1px solid ${props => props.theme.border};

  color: ${props => (props.disabled ? props.theme.border : props.theme.text)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`

export const Element = styled.input`
  position: relative;
  height: 100%;
  width: 100%;

  background-color: transparent;
  border-radius: 0;
  border: 0;

  appearance: none;

  cursor: inherit;
`

export const Checkmark = styled.div`
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