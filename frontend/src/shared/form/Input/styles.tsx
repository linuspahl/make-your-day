// libraries
import styled from 'styled-components'

export const Element = styled.input`
  width: 100%;
  height: 40px;

  padding: 0 10px;
  margin-top: 3px;
  border-radius: 0;
  border: 1px solid ${(props): string => props.theme.border};

  color: ${(props): string => (props.disabled ? '#b5b5b5' : props.theme.text)};
  box-shadow: none;
  appearance: none;
  background-color: transparent;
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'text')};
`
