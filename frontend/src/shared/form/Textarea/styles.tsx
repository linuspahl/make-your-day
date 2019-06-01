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

  padding: 10px;
  margin-top: 3px;
  border-radius: inherit;
  border: 1px solid ${(props): string => props.theme.border};

  background-color: transparent;
  color: ${(props): string => props.theme.text};

  box-shadow: none;
  appearance: none;
`
