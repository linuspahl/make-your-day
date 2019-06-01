// libraries
import styled from 'styled-components'
// interfaces
interface ElementProps {
  context: string
}

export const Element = styled.h1<ElementProps>`
  font-size: 28px;
  text-align: center;
  hyphens: auto;
  ${(props): string => props.context === 'page' && 'margin-bottom: 60px;'};
`
