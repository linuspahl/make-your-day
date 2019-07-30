// libraries
import styled from 'styled-components'

interface ElementProps {
  autocomplete?: string
}

export const Element = styled.input<ElementProps>`
  width: 100%;
  height: 2.5rem;

  padding: ${(props): string => `0 ${props.theme.padding / 2}rem`};
  margin-top: ${(props): string => `${props.theme.padding / 5}rem`};
  border-radius: 0;
  border: 0.0625rem solid ${(props): string => props.theme.border};

  color: ${(props): string => (props.disabled ? '#b5b5b5' : props.theme.text)};
  box-shadow: none;
  appearance: none;
  background-color: transparent;
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'text')};
`
