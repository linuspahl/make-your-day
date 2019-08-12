// libraries
import styled from 'styled-components'
// interfaces
import { InputEvent } from 'types/types'

interface ElementProps {
  disabled?: boolean
  name: string
  onChange: (event: InputEvent) => void
  required?: boolean
  type?: string
  value: string
}

export const Element = styled.textarea<ElementProps>`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;

  padding: ${(props): string => `${props.theme.padding / 2}rem`};
  margin-top: ${(props): string => `${props.theme.padding / 5}rem`};
  border-radius: inherit;
  border: 0.0625rem solid ${(props): string => props.theme.border};

  background-color: transparent;

  color: ${(props): string => props.theme.text};

  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'text')};
  box-shadow: none;
  appearance: none;
`
