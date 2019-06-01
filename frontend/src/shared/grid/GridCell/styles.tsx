// libraries
import styled from 'styled-components'

interface ElementProps {
  justify?: string
}

export const Element = styled.div<ElementProps>`
  display: flex;
  justify-content: ${(props): string => props.justify || 'flex-start'};
`
